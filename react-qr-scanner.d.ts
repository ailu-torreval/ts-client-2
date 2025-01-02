declare module 'react-qr-scanner' {
  import { Component } from 'react';

  interface QrReaderProps {
    delay?: number | false;
    onError?: (error: any) => void;
    onScan?: (data: string | null) => void;
    style?: React.CSSProperties;
    facingMode?: 'user' | 'environment';
    legacyMode?: boolean;
    maxImageSize?: number;
    className?: string;
    showViewFinder?: boolean;
    constraints?: MediaTrackConstraints;
  }

  class QrReader extends Component<QrReaderProps> {}

  export default QrReader;
}