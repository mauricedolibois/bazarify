import React from 'react';
import { Document, Page } from 'react-pdf';

export default function pdfView() {
  return (
    <Document file='./sample.pdf'>
      <Page pageNumber={1} />
    </Document>
  );
}