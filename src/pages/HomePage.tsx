import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FormatSelector from '../components/FormatSelector';
import SupportedFormats from '../components/SupportedFormats';
import ConversionHistory from '../components/ConversionHistory';
import WhyChooseUs from '../components/WhyChooseUs';
import { UploadedFile } from '../types';
import { supabase } from '../lib/supabase';
import { downloadFile, checkConversionSupport } from '../utils/fileConverter';

export default function HomePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [converting, setConverting] = useState<string | null>(null);

  const pollJobStatus = async (jobId: string, fileName: string, toFormat: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async (): Promise<void> => {
      if (attempts >= maxAttempts) {
        throw new Error('Conversion timeout');
      }

      attempts++;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file/status/${jobId}`
      );

      if (!response.ok) {
        throw new Error('Failed to check job status');
      }

      const job = await response.json();

      if (job.status === 'completed') {
        return;
      } else if (job.status === 'failed') {
        throw new Error(job.error_message || 'Conversion failed');
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return poll();
      }
    };

    await poll();
  };

  const handleConvert = async (fileId: string, toFormat: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    const support = checkConversionSupport(file.format, toFormat);

    if (!support.supported) {
      alert(support.message || 'This conversion is not supported');
      return;
    }

    setConverting(fileId);

    try {
      const { error: insertError } = await supabase
        .from('conversion_history')
        .insert({
          file_name: file.name,
          from_format: file.format,
          to_format: toFormat,
          file_size: file.size,
          status: 'processing'
        });

      if (insertError) throw insertError;

      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('outputFormat', toFormat);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Conversion failed');
      }

      if (response.status === 202) {
        const result = await response.json();
        await pollJobStatus(result.jobId, file.name, toFormat);

        const downloadResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file/status/${result.jobId}`
        );

        if (downloadResponse.ok) {
          const blob = await downloadResponse.blob();
          const fileName = `${file.name.split('.')[0]}.${toFormat}`;
          downloadFile(blob, fileName);
        }
      } else {
        const blob = await response.blob();
        const fileName = `${file.name.split('.')[0]}.${toFormat}`;
        downloadFile(blob, fileName);
      }

      const { error: updateError } = await supabase
        .from('conversion_history')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('file_name', file.name)
        .eq('from_format', file.format)
        .eq('to_format', toFormat)
        .order('created_at', { ascending: false })
        .limit(1);

      if (updateError) throw updateError;

      setRefreshHistory(prev => prev + 1);
    } catch (error) {
      console.error('Error during conversion:', error);

      await supabase
        .from('conversion_history')
        .update({ status: 'failed' })
        .eq('file_name', file.name)
        .eq('from_format', file.format)
        .eq('to_format', toFormat)
        .order('created_at', { ascending: false })
        .limit(1);

      alert(error instanceof Error ? error.message : 'Conversion failed');
    } finally {
      setConverting(null);
    }
  };

  return (
    <main className="relative max-w-7xl mx-auto px-6 py-12 space-y-20">
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold text-white">
            Convert Any File Format
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fast, secure, and easy file conversion. Support for 140 formats with no file size limits.
          </p>
        </div>

        <FileUpload onFilesUploaded={setUploadedFiles} />

        {uploadedFiles.length > 0 && (
          <FormatSelector files={uploadedFiles} onConvert={handleConvert} />
        )}
      </section>

      <section>
        <ConversionHistory key={refreshHistory} />
      </section>

      <section>
        <SupportedFormats />
      </section>

      <section>
        <WhyChooseUs />
      </section>
    </main>
  );
}
