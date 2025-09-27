"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Brush, Square, Eraser, Download, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BLUR_COLORS = [
  { name: "Normal", value: "transparent" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
];

const BLUR_MODES = [
  {
    name: "Normal Draw",
    value: "normal",
    icon: Brush,
    description: "Circular blur brush",
  },
  {
    name: "Square Blur",
    value: "square",
    icon: Square,
    description: "Square area blur",
  },
  {
    name: "Erase",
    value: "erase",
    icon: Eraser,
    description: "Erase blur effects",
  },
];

export default function RunderHome() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(BLUR_COLORS[0]);
  const [brushSize, setBrushSize] = useState([20]);
  const [blurIntensity, setBlurIntensity] = useState([50]);
  const [opacity, setOpacity] = useState([40]); // Default opacity 40%
  const [isDrawing, setIsDrawing] = useState(false);
  const [blurMode, setBlurMode] = useState(BLUR_MODES[0]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [squareStart, setSquareStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloadFormat, setDownloadFormat] = useState("png"); // New state for download format
  const [fileName, setFileName] = useState<string>("blurred-image"); // New state for file name

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, historyIndex, history]);

  // Ensure canvas is properly initialized when image is set
  useEffect(() => {
    if (image) {
      // If we have the original image reference, use it
      if (originalImageRef.current) {
        // Redraw image on canvas when image state changes
        const timer = setTimeout(() => {
          drawImageOnCanvas(originalImageRef.current!);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // If we don't have the original image reference yet,
        // create it from the image data
        const img = new Image();
        img.onload = () => {
          originalImageRef.current = img;
          drawImageOnCanvas(img);
        };
        img.src = image;
      }
    }
  }, [image]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      // Set the file name without extension
      const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      setFileName(nameWithoutExtension);

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          // Store original image reference first
          originalImageRef.current = img;
          // Set the image state second
          setImage(imageData);
          // Initialize history with the original image
          setHistory([imageData]);
          setHistoryIndex(0);
          // The useEffect will handle drawing the image on canvas
          setIsUploading(false);
        };
        img.onerror = () => {
          console.error("Failed to load image");
          setIsUploading(false);
        };
        img.src = imageData;
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    // Reset the file input value to allow uploading the same file multiple times
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      restoreCanvasFromDataUrl(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      restoreCanvasFromDataUrl(history[nextIndex]);
    }
  };

  const restoreCanvasFromDataUrl = (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  };

  const drawImageOnCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context not found");
      return;
    }

    // Ensure canvas is properly sized before drawing
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image
    try {
      ctx.drawImage(img, 0, 0);
      console.log("Image successfully drawn on canvas");
    } catch (error) {
      console.error("Error drawing image on canvas:", error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (blurMode.value === "square") {
      // For square blur, set the starting point
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const scaleX = canvasRef.current!.width / rect.width;
      const scaleY = canvasRef.current!.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      setSquareStart({ x, y });
    } else if (blurMode.value === "erase") {
      // For erase mode, start drawing
      setIsDrawing(true);
      drawErase(e);
    } else {
      // For normal blur, start drawing
      setIsDrawing(true);
      drawBlur(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (blurMode.value === "square" && squareStart) {
      // For square blur, track current mouse position for preview
      const rect = canvasRef.current?.getBoundingClientRect();
      const canvas = canvasRef.current;
      if (!rect || !canvas) return;

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      setCurrentMousePos({ x, y });
    } else if (isDrawing) {
      if (blurMode.value === "erase") {
        drawErase(e);
      } else {
        // For normal blur, continue drawing
        drawBlur(e);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (blurMode.value === "square" && squareStart) {
      // For square blur, draw the square when mouse is released
      drawSquareBlur(e);
      setSquareStart(null);
      setCurrentMousePos(null);
    } else if (isDrawing) {
      // For normal or erase blur, save to history after drawing is completed
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const drawSquareBlur = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !squareStart) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const endX = (e.clientX - rect.left) * scaleX;
    const endY = (e.clientY - rect.top) * scaleY;

    // Calculate blur amount based on intensity (0-100 to 0-20px blur)
    const blurAmount = (blurIntensity[0] / 100) * 20;

    ctx.save();

    // Create a path for the square
    ctx.beginPath();
    const width = endX - squareStart.x;
    const height = endY - squareStart.y;
    ctx.rect(squareStart.x, squareStart.y, width, height);

    // Clip to the square area
    ctx.clip();

    // Apply blur filter only to the content within the square
    ctx.filter = `blur(${blurAmount}px)`;

    // Draw the blurred area by redrawing the canvas content within the clipped area
    ctx.drawImage(canvas, 0, 0);

    // Apply color overlay with sharp edges
    if (selectedColor.value !== "transparent") {
      // Reset filter and composite operation for sharp color overlay
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = opacity[0] / 100; // Convert percentage to decimal (0-1)
      ctx.fillStyle = selectedColor.value;
      ctx.fillRect(squareStart.x, squareStart.y, width, height);
    }

    ctx.restore();

    // Save to history after square is drawn
    saveToHistory();
  };

  const drawBlur = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Calculate blur amount based on intensity (0-100 to 0-20px blur)
    const blurAmount = (blurIntensity[0] / 100) * 20;

    ctx.save();

    // Create circular clipping path for precise blur area
    ctx.beginPath();
    ctx.arc(x, y, brushSize[0], 0, Math.PI * 2);
    ctx.clip();

    // Apply blur filter directly to the area
    ctx.filter = `blur(${blurAmount}px)`;

    // Draw the blurred version of the current canvas content
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) {
      ctx.restore();
      return;
    }

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    // Draw the blurred area
    ctx.drawImage(
      tempCanvas,
      x - brushSize[0],
      y - brushSize[0],
      brushSize[0] * 2,
      brushSize[0] * 2,
      x - brushSize[0],
      y - brushSize[0],
      brushSize[0] * 2,
      brushSize[0] * 2
    );

    // Apply color overlay with transparency only if not normal blur
    if (selectedColor.value !== "transparent") {
      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = opacity[0] / 100; // Convert percentage to decimal (0-1)
      ctx.fillStyle = selectedColor.value;
      ctx.fillRect(
        x - brushSize[0],
        y - brushSize[0],
        brushSize[0] * 2,
        brushSize[0] * 2
      );
    }

    ctx.restore();
  };

  const drawErase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.save();

    // Create circular clipping path for precise erase area
    ctx.beginPath();
    ctx.arc(x, y, brushSize[0], 0, Math.PI * 2);
    ctx.clip();

    // If we have the original image, restore that portion
    if (originalImageRef.current) {
      // Draw the original image in the circular area to "erase" the blur
      ctx.drawImage(
        originalImageRef.current,
        x - brushSize[0],
        y - brushSize[0],
        brushSize[0] * 2,
        brushSize[0] * 2,
        x - brushSize[0],
        y - brushSize[0],
        brushSize[0] * 2,
        brushSize[0] * 2
      );
    } else {
      // Fallback: clear to transparent
      ctx.clearRect(
        x - brushSize[0],
        y - brushSize[0],
        brushSize[0] * 2,
        brushSize[0] * 2
      );
    }

    ctx.restore();
  };

  const handleDownload = (format: string = downloadFormat) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mimeType = "image/png";
    let fileExtension = "png";

    switch (format.toLowerCase()) {
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        fileExtension = "jpg";
        break;
      case "png":
        mimeType = "image/png";
        fileExtension = "png";
        break;
      case "svg":
        // For SVG, we'll create a data URL of the canvas as PNG embedded in SVG
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${
            canvas.width
          }" height="${canvas.height}">
            <image href="${canvas.toDataURL("image/png")}" width="${
          canvas.width
        }" height="${canvas.height}" />
          </svg>
        `;
        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `[blur] ${fileName}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        return;
      default:
        mimeType = "image/png";
        fileExtension = "png";
    }

    const link = document.createElement("a");
    link.download = `[blur] ${fileName}.${fileExtension}`;

    if (format.toLowerCase() === "jpg" || format.toLowerCase() === "jpeg") {
      link.href = canvas.toDataURL(mimeType, 0.92); // JPEG quality
    } else {
      link.href = canvas.toDataURL(mimeType);
    }

    link.click();
  };

  const handleReset = () => {
    if (originalImageRef.current) {
      drawImageOnCanvas(originalImageRef.current);
      // Reset to original image in history
      if (history.length > 0) {
        setHistoryIndex(0);
        restoreCanvasFromDataUrl(history[0]);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling and other touch actions
    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];

      // Calculate coordinates the same way as in handleMouseDown
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;

      if (blurMode.value === "square") {
        // For square blur, set the starting point
        setSquareStart({ x, y });
      } else if (blurMode.value === "erase") {
        // For erase mode, start drawing
        setIsDrawing(true);
        // Create a synthetic mouse event for drawErase
        const syntheticEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
          currentTarget: canvas,
        } as unknown as React.MouseEvent<HTMLCanvasElement>;
        drawErase(syntheticEvent);
      } else {
        // For normal blur, start drawing
        setIsDrawing(true);
        // Create a synthetic mouse event for drawBlur
        const syntheticEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
          currentTarget: canvas,
        } as unknown as React.MouseEvent<HTMLCanvasElement>;
        drawBlur(syntheticEvent);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling and other touch actions
    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];

      // Calculate coordinates the same way as in handleMouseMove
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;

      if (blurMode.value === "square" && squareStart) {
        // For square blur, track current touch position for preview
        setCurrentMousePos({ x, y });
      } else if (isDrawing) {
        // Create a synthetic mouse event for drawing functions
        const syntheticEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
          currentTarget: canvas,
        } as unknown as React.MouseEvent<HTMLCanvasElement>;

        if (blurMode.value === "erase") {
          drawErase(syntheticEvent);
        } else {
          // For normal blur, continue drawing
          drawBlur(syntheticEvent);
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling and other touch actions
    e.preventDefault();
    e.stopPropagation();

    if (blurMode.value === "square" && squareStart) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // For square blur, we need to get the end coordinates
      const rect = canvas.getBoundingClientRect();

      // Use the last touch position if available, otherwise use the start position
      let endX = squareStart.x;
      let endY = squareStart.y;

      if (currentMousePos) {
        endX = currentMousePos.x;
        endY = currentMousePos.y;
      }

      // Create a synthetic mouse event with the end coordinates
      const syntheticEvent = {
        clientX: (endX / canvas.width) * rect.width + rect.left,
        clientY: (endY / canvas.height) * rect.height + rect.top,
        currentTarget: canvas,
      } as unknown as React.MouseEvent<HTMLCanvasElement>;

      // Draw the square blur
      drawSquareBlur(syntheticEvent);
      setSquareStart(null);
      setCurrentMousePos(null);
    } else if (isDrawing) {
      // For normal or erase blur, save to history after drawing is completed
      setIsDrawing(false);
      saveToHistory();
    }
  };

  return (
    <div className="pt-6">
      <div className="max-w-6xl mx-auto p-2">
        <div className="text-center mb-8 px-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Start Blurring Your Images
          </h2>
          <p className="text-gray-600 px-1">
            Upload an image and choose from normal, line, or erase blur modes
            with adjustable intensity and color options
          </p>
        </div>

        {/* Mobile: Upload section at top, Desktop: Upload section in sidebar */}
        <div className="lg:hidden mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={triggerFileInput}
                  className="w-full"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Choose Image File"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-first layout: Image Editor at top, then controls */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Mobile: Image Editor at top, Desktop: Image Editor on right */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Image Editor</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleUndo}
                      disabled={!image || historyIndex <= 0 || isUploading}
                      variant="outline"
                      size="sm"
                      title="Undo (Ctrl+Z)"
                      className="flex-1 min-w-[70px]"
                    >
                      ↶ Undo
                    </Button>
                    <Button
                      onClick={handleRedo}
                      disabled={
                        !image ||
                        historyIndex >= history.length - 1 ||
                        isUploading
                      }
                      variant="outline"
                      size="sm"
                      title="Redo (Ctrl+Y)"
                      className="flex-1 min-w-[70px]"
                    >
                      ↷ Redo
                    </Button>
                    <Button
                      onClick={handleReset}
                      disabled={!image || isUploading}
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-[70px]"
                    >
                      Reset
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          disabled={!image || isUploading}
                          variant="default"
                          size="sm"
                          className="flex-1 min-w-[70px]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDownload("png")}>
                          PNG
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload("jpg")}>
                          JPG
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownload("jpeg")}
                        >
                          JPEG
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload("svg")}>
                          SVG
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px] sm:min-h-[500px] flex items-center justify-center"
                  style={{ touchAction: "none", overflow: "hidden" }}
                >
                  {isUploading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading image...</p>
                    </div>
                  ) : image ? (
                    <div
                      className="relative w-full flex items-center justify-center"
                      style={{ touchAction: "none" }}
                    >
                      <div
                        ref={canvasContainerRef}
                        className="relative inline-block"
                        style={{ touchAction: "none" }}
                      >
                        <canvas
                          ref={canvasRef}
                          className={`border border-gray-200 rounded max-w-full max-h-[600px] w-full ${
                            blurMode.value === "normal"
                              ? "cursor-crosshair"
                              : blurMode.value === "erase"
                              ? "cursor-grab"
                              : "cursor-crosshair"
                          }`}
                          style={{ touchAction: "none" }}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        />
                        {blurMode.value === "square" &&
                          squareStart &&
                          currentMousePos &&
                          canvasRef.current && (
                            <div
                              className="absolute border-2 border-dashed border-blue-500 pointer-events-none"
                              style={{
                                left: `${
                                  (Math.min(squareStart.x, currentMousePos.x) /
                                    canvasRef.current.width) *
                                  100
                                }%`,
                                top: `${
                                  (Math.min(squareStart.y, currentMousePos.y) /
                                    canvasRef.current.height) *
                                  100
                                }%`,
                                width: `${
                                  (Math.abs(currentMousePos.x - squareStart.x) /
                                    canvasRef.current.width) *
                                  100
                                }%`,
                                height: `${
                                  (Math.abs(currentMousePos.y - squareStart.y) /
                                    canvasRef.current.height) *
                                  100
                                }%`,
                              }}
                            />
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-gray-400 mb-4">
                        <svg
                          className="w-16 h-16 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500">
                        <button
                          onClick={triggerFileInput}
                          className="text-blue-600 hover:text-blue-800 underline font-medium"
                        >
                          Upload an image
                        </button>{" "}
                        to start editing
                        <br />
                        <span className="text-xs text-gray-400 mt-1 block">
                          {blurMode.value === "normal"
                            ? "Click and drag to apply circular blur"
                            : blurMode.value === "erase"
                            ? "Click and drag to erase blur effects"
                            : "Click and drag to create a square blur area"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="order-2 lg:order-1 lg:col-span-1 space-y-4">
            {/* Desktop: Upload section in sidebar, Hidden on mobile since it's moved to top */}
            <div className="hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={triggerFileInput}
                      className="w-full"
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Choose Image File"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Blur Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {BLUR_MODES.map((mode) => {
                    const IconComponent = mode.icon;
                    return (
                      <Button
                        key={mode.value}
                        variant={
                          blurMode.value === mode.value ? "default" : "outline"
                        }
                        onClick={() => setBlurMode(mode)}
                        title={mode.description}
                        className="flex items-center p-2 h-auto flex-1 min-w-[80px]"
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {mode.name}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blur Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {BLUR_COLORS.map((color) => (
                    <Button
                      key={color.value}
                      variant={
                        selectedColor.value === color.value
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color.value === "transparent" ? (
                        <div className="w-4 h-4 rounded-full mr-2 border-2 border-gray-400 bg-white" />
                      ) : (
                        <div
                          className="w-4 h-4 rounded-full mr-2 border"
                          style={{ backgroundColor: color.value }}
                        />
                      )}
                      {color.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brush Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Brush Size
                    </label>
                    <Slider
                      value={brushSize}
                      onValueChange={setBrushSize}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary">{brushSize[0]}px</Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Blur Intensity
                    </label>
                    <Slider
                      value={blurIntensity}
                      onValueChange={setBlurIntensity}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary">{blurIntensity[0]}%</Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                      Color Opacity
                    </label>
                    <Slider
                      value={opacity}
                      onValueChange={setOpacity}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary">{opacity[0]}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
