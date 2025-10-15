import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface PDFUploaderProps {
  onUploadComplete?: (file: File) => void;
  redirectOnUpload?: boolean;
  redirectPath?: string;
}

const PDFUploader = ({ 
  onUploadComplete, 
  redirectOnUpload = true, 
  redirectPath = "/analysis" 
}: PDFUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    toast({
      title: "PDF Uploaded Successfully",
      description: `${file.name} is being analyzed...`,
    });

    // Simulate processing/upload time
    setTimeout(() => {
      setUploading(false);
      
      if (onUploadComplete) {
        onUploadComplete(file);
      }

      if (redirectOnUpload) {
        navigate(redirectPath);
      }
    }, 1500);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileChange(file || null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFileChange(file || null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant hover:shadow-glow transition-all duration-300 border-primary/20">
      <CardHeader className="bg-gradient-card">
        <CardTitle className="flex items-center gap-2 font-display text-foreground">
          <Upload className="h-5 w-5 text-primary" />
          Upload Proposal Document
        </CardTitle>
        <CardDescription>
          Upload a PDF proposal for comprehensive AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          animate={{
            borderColor: dragActive ? "hsl(var(--primary))" : "hsl(var(--border))",
            backgroundColor: dragActive ? "hsl(var(--primary) / 0.05)" : "transparent",
          }}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-300
            ${uploading ? "opacity-50 pointer-events-none" : "hover:border-primary/50"}
          `}
          onClick={handleButtonClick}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Processing your document...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gradient-hero/10 rounded-full shadow-md">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2 font-display">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF files up to 50MB
                </p>
              </div>
              <Button type="button" variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-all">
                <Upload className="mr-2 h-4 w-4" />
                Select PDF File
              </Button>
            </div>
          )}
        </motion.div>

        <div className="mt-6 p-4 bg-gradient-card rounded-lg border border-muted shadow-sm">
          <p className="text-sm font-medium mb-2 font-display text-foreground">What happens after upload?</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              AI analyzes your proposal document
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
              Financial compliance check (GST, TDS)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              Risk assessment and SWOT analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Actionable recommendations and insights
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFUploader;
