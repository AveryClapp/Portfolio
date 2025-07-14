/// app/resume/page.js
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { Download, ExternalLink, FileText } from "lucide-react";

export const metadata = {
  title: "Avery's Resume",
  icons: {
    icon: '/file.svg',
  },
};

export default function ResumePage() {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <main className="relative z-20 flex-1 mb-6">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          {/* Resume Viewer */}
          <div className="bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden mb-6">
            {/* Viewer Header */}
            <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4">
              <div className="flex items-center justify-center">
                <p className="text-sm text-neutral-500 font-mono">Avery-Clapp-Resume.pdf</p>
              </div>
            </div>

            {/* PDF Iframe */}
            <div className="relative">
              <iframe
                src="/Avery-Clapp-Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-[900px] border-0"
                title="Avery Clapp Resume"
                loading="lazy"
              />

              {/* Fallback message */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 text-neutral-600"
                style={{ zIndex: -1 }}>
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
                  <p className="text-lg font-medium mb-2">PDF Viewer</p>
                  <p className="text-sm">If the PDF doesn't load, please download it directly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Page Header - Moved below and made smaller */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-neutral-700" />
              <h1 className="text-2xl font-bold text-neutral-900">Resume</h1>
            </div>
            <p className="text-neutral-600 text-sm max-w-xl">
              Download or view my latest resume. For the most up-to-date version or specific formats,
              feel free to reach out directly.
            </p>
          </div>

          {/* Action Buttons - Moved below and made smaller */}
          <div className="flex flex-wrap gap-3">
            <a
              href="/Avery-Clapp-Resume.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white font-medium text-sm rounded-md hover:bg-neutral-800 transition-colors duration-200 shadow-sm"
            >
              <Download size={16} className="mr-2" />
              Download PDF
            </a>
            <a
              href="/Avery-Clapp-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white text-neutral-900 font-medium text-sm rounded-md border border-neutral-300 hover:bg-neutral-50 transition-colors duration-200 shadow-sm"
            >
              <ExternalLink size={16} className="mr-2" />
              Open in New Tab
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
