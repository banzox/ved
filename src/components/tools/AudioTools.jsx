import React, { useState, useRef } from 'react';
import { Music, Scissors, Download, Play, Pause, RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AudioConverter() {
  const [audioFile, setAudioFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('audio/wav');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setConvertedUrl(null);
    }
  };

  const convertAudio = async () => {
    if (!audioFile) return alert('يرجى اختيار ملف صوتي أولاً');
    setIsConverting(true);

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Create destination & offline context for encoding
      const offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start();

      const renderedBuffer = await offlineCtx.startRendering();

      // Convert audioBuffer to WAV blob
      const wavBlob = audioBufferToWav(renderedBuffer);
      const url = URL.createObjectURL(wavBlob);
      setConvertedUrl(url);

      confetti({ particleCount: 70 });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء معالجة الملف الصوتي.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
        <Music size={20} color="#38bdf8" /> محول الصيغ الصوتية (MP3/WAV)
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>حَول أي ملف صوتي إلى صيغة WAV عالية الدقة أو MP3 في المتصفح.</p>

      <input type="file" accept="audio/*" onChange={handleAudioUpload} className="glass-input" />

      {audioFile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(10, 20, 48, 0.6)', padding: '1rem', borderRadius: '0.85rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>الملف المحدد: {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)</p>
          </div>

          <button onClick={convertAudio} disabled={isConverting} className="btn-gradient">
            {isConverting ? 'جاري التحويل والمعالجة...' : <><RefreshCw size={18} /> بدء التحويل إلى WAV/MP3</>}
          </button>

          {convertedUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <audio controls src={convertedUrl} style={{ width: '100%' }} />
              <a href={convertedUrl} download={`converted-${Date.now()}.wav`} className="btn-gradient" style={{ textAlign: 'center' }}>
                <Download size={18} /> تحميل الملف الصوتي المحول
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AudioTrimmer() {
  const [audioFile, setAudioFile] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [duration, setDuration] = useState(0);
  const [trimmedUrl, setTrimmedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const audioRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAudioFile(file);

    const url = URL.createObjectURL(file);
    const tempAudio = new Audio(url);
    tempAudio.onloadedmetadata = () => {
      setDuration(Math.floor(tempAudio.duration));
      setEndTime(Math.min(10, Math.floor(tempAudio.duration)));
    };
  };

  const trimAudio = async () => {
    if (!audioFile) return;
    setIsProcessing(true);

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = await audioFile.arrayBuffer();
      const decoded = await audioCtx.decodeAudioData(buffer);

      const sampleRate = decoded.sampleRate;
      const startOffset = Math.floor(startTime * sampleRate);
      const endOffset = Math.floor(endTime * sampleRate);
      const frameCount = endOffset - startOffset;

      const trimmedBuffer = audioCtx.createBuffer(
        decoded.numberOfChannels,
        frameCount,
        sampleRate
      );

      for (let i = 0; i < decoded.numberOfChannels; i++) {
        const channelData = decoded.getChannelData(i);
        const trimmedData = trimmedBuffer.getChannelData(i);
        for (let j = 0; j < frameCount; j++) {
          trimmedData[j] = channelData[startOffset + j];
        }
      }

      const wavBlob = audioBufferToWav(trimmedBuffer);
      const url = URL.createObjectURL(wavBlob);
      setTrimmedUrl(url);

      confetti({ particleCount: 70 });
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء قص الصوت.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff' }}>
        <Scissors size={20} color="#00d2ff" /> قاطع ومقطع الصوتيات
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>حدد التوقيت الزمني لقص واستخراج مقطع صوّتي محدد بوضوح.</p>

      <input type="file" accept="audio/*" onChange={handleUpload} className="glass-input" />

      {audioFile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>وقت البداية (بالثواني):</label>
              <input type="number" min="0" max={duration} className="glass-input" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem', color: '#cbd5e1' }}>وقت النهاية (بالثواني):</label>
              <input type="number" min="1" max={duration} className="glass-input" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} />
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>إجمالي مدة الملف الاصلي: {duration} ثانية</p>

          <button onClick={trimAudio} disabled={isProcessing} className="btn-gradient">
            {isProcessing ? 'جاري القص...' : <><Scissors size={18} /> قص المقطع الصوتي وتحميله</>}
          </button>

          {trimmedUrl && (
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <audio controls src={trimmedUrl} style={{ width: '100%' }} />
              <a href={trimmedUrl} download={`trimmed-${Date.now()}.wav`} className="btn-gradient">
                <Download size={18} /> تحميل المقطع المقصوص
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// AudioBuffer to WAV Helper
function audioBufferToWav(buffer) {
  let numChannels = buffer.numberOfChannels;
  let sampleRate = buffer.sampleRate;
  let format = 1; // PCM
  let bitDepth = 16;
  
  let bytesPerSample = bitDepth / 8;
  let blockAlign = numChannels * bytesPerSample;
  
  let data = [];
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      let sample = buffer.getChannelData(channel)[i];
      sample = Math.max(-1, Math.min(1, sample));
      data.push(sample < 0 ? sample * 0x8000 : sample * 0x7FFF);
    }
  }

  let dataBuffer = new Int16Array(data);
  let wavBuffer = new ArrayBuffer(44 + dataBuffer.length * 2);
  let view = new DataView(wavBuffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + dataBuffer.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * blockAlign, true);
  /* block align */
  view.setUint16(32, blockAlign, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, dataBuffer.length * 2, true);

  // Write samples
  for (let i = 0; i < dataBuffer.length; i++) {
    view.setInt16(44 + i * 2, dataBuffer[i], true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
