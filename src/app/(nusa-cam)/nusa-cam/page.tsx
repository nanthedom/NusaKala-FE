"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Camera,
    Upload,
    X,
    Loader2,
    CheckCircle,
    AlertCircle,
    RotateCcw,
    ImageIcon,
    RefreshCw,
    Info,
    Star,
} from "lucide-react"

// Batik pattern information constants
const BATIK_PATTERNS = {
    0: {
        // Parang
        name: "Parang",
        origin: "Yogyakarta & Solo, Central Java",
        description:
            "A classic motif shaped like the letter 'S' that curves resembling ocean waves or mountain slopes. Parang is one of the oldest and most famous motifs in Indonesian batik.",
        cultural_significance:
            "Symbolizes strength, perseverance, and an unyielding spirit. In the past, this motif could only be worn by royal families as a symbol of power and nobility.",
        color: "from-amber-500 to-orange-600",
        icon: "🌊",
    },
    1: {
        // Mega Mendung
        name: "Mega Mendung",
        origin: "Cirebon, West Java",
        description:
            "A gradient cloud motif with distinctive spiral shapes, reflecting Chinese cultural influence in Indonesian batik art. Blue dominates with smooth gradations.",
        cultural_significance:
            "Symbolizes patience, tranquility, and wisdom. This motif teaches us to remain calm when facing life's storms, like clouds that patiently await rain.",
        color: "from-blue-500 to-indigo-600",
        icon: "☁️",
    },
    2: {
        // Kawung
        name: "Kawung",
        origin: "Yogyakarta & Solo, Central Java",
        description:
            "A geometric motif in the form of circles or ovals arranged neatly, inspired by kawung fruit (aren) or kolang-kaling. This pattern reflects simplicity and harmony.",
        cultural_significance:
            "Symbolizes purity of heart, self-control, and justice. This motif teaches about the importance of maintaining balance in life and being fair to others.",
        color: "from-emerald-500 to-teal-600",
        icon: "⭕",
    },
    3: {
        // Truntum
        name: "Truntum",
        origin: "Yogyakarta, Central Java",
        description:
            "A motif of small flowers scattered evenly with regular and neat patterns. Truntum comes from the word 'taruntum' which means to grow, symbolizing love that grows again.",
        cultural_significance:
            "Symbolizes sincere love, loyalty, and hope. This motif is often used in wedding ceremonies as a prayer that the couple's love continues to grow and develop.",
        color: "from-pink-500 to-rose-600",
        icon: "🌸",
    },
}

type BatikPatternInfo = {
    name: string
    origin: string
    description: string
    cultural_significance: string
    color: string
    icon: string
}

type PredictionResult = {
    prediction: keyof typeof BATIK_PATTERNS
    confidence: number
} & BatikPatternInfo

export default function NusaCamPage() {
    const { user } = useAuth()
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [prediction, setPrediction] = useState<PredictionResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [predictionError, setPredictionError] = useState<string | null>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [cameraReady, setCameraReady] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const startCamera = async () => {
        try {
            setError(null)
            setPredictionError(null)
            setSelectedImage(null)
            setSelectedFile(null)
            setPrediction(null)
            setIsCameraActive(true)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment",
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                streamRef.current = stream
                setCameraReady(false)
            }
        } catch (err) {
            console.log(err)
            setError("Cannot access camera. Please ensure camera permission is granted.")
            setIsCameraActive(false)
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }
        setIsCameraActive(false)
        setCameraReady(false)
    }

    const handleVideoReady = () => {
        setCameraReady(true)
    }

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current && cameraReady) {
            const canvas = canvasRef.current
            const video = videoRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.drawImage(video, 0, 0)
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
                            const imageUrl = URL.createObjectURL(blob)
                            setSelectedFile(file)
                            setSelectedImage(imageUrl)
                            stopCamera()
                            setError(null)
                            setPredictionError(null)
                        }
                    },
                    "image/jpeg",
                    0.9,
                )
            }
        }
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file)
            setSelectedFile(file)
            setSelectedImage(imageUrl)
            setPrediction(null)
            setError(null)
            setPredictionError(null)
            stopCamera()
        } else {
            setError("Please select a valid image file (JPG, PNG, etc.)")
        }
    }

    const predictBatik = async () => {
        if (!selectedFile) return

        setIsLoading(true)
        setError(null)
        setPrediction(null)
        setPredictionError(null)

        try {
            const formData = new FormData()
            formData.append("image", selectedFile)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict/batik`, {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `Server error: ${response.status}`)
            }

            const result = await response.json()

            // Map prediction result to batik pattern info
            const patternInfo = BATIK_PATTERNS[result.prediction as keyof typeof BATIK_PATTERNS]
            if (!patternInfo) {
                throw new Error("Batik pattern not recognized")
            }

            setPrediction({
                ...result,
                ...patternInfo,
            })
            console.log(prediction)
        } catch (err) {
            console.error("Prediction error:", err)
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
            setPredictionError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const resetAll = () => {
        setSelectedImage(null)
        setSelectedFile(null)
        setPrediction(null)
        setError(null)
        setPredictionError(null)
        stopCamera()
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const retryPrediction = () => {
        setPredictionError(null)
        predictBatik()
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return "bg-green-100 text-green-800 border-green-200"
        if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800 border-yellow-200"
        return "bg-red-100 text-red-800 border-red-200"
    }

    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [])

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-nusa-bronze" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-nusa-gold/5 to-nusa-bronze/5">
            <div className="container mx-auto px-4 py-4 max-w-7xl">
                {/* Header - Improved mobile spacing */}
                <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-nusa-darkBrown mb-2 flex items-center justify-center gap-2 flex-wrap">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-nusa-bronze flex-shrink-0" />
                        <span>Nusa Cam</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-nusa-brown px-2 sm:px-4 leading-relaxed">
                        Scan and identify batik patterns with AI technology
                    </p>
                </div>

                {/* Error Alert - Better mobile spacing */}
                {error && (
                    <Alert className="mb-4 sm:mb-6 border-red-200 bg-red-50 mx-2 sm:mx-0">
                        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <AlertDescription className="text-red-800 text-xs sm:text-sm md:text-base break-words">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Main Content Grid - Improved responsive layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {/* Camera/Upload Section */}
                    <Card className="border-nusa-gold/20 shadow-lg overflow-hidden gap-1">
                        <CardHeader className="bg-gradient-to-r from-nusa-gold/10 to-nusa-bronze/10 p-0 sm:p-4 lg:p-6">
                            <CardTitle className="flex items-center justify-center gap-2 text-nusa-darkBrown text-sm sm:text-base md:text-lg lg:text-xl">
                                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-nusa-bronze flex-shrink-0" />
                                <span className="truncate min-w-0">{isCameraActive ? "Camera Preview" : "Take or Upload Photo"}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 lg:p-6">
                            {/* CAMERA PREVIEW MODE */}
                            {isCameraActive && (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover"
                                            onLoadedMetadata={handleVideoReady}
                                        />
                                        {/* Camera Overlay - Responsive grid */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute inset-2 sm:inset-4 border-2 border-white/30 rounded-lg">
                                                <div className="absolute top-1/3 left-0 right-0 border-t border-white/20"></div>
                                                <div className="absolute top-2/3 left-0 right-0 border-t border-white/20"></div>
                                                <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/20"></div>
                                                <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/20"></div>
                                            </div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-2 border-white rounded-full"></div>
                                        </div>
                                        {/* Loading Overlay */}
                                        {!cameraReady && (
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                <div className="text-white text-center p-3 sm:p-4">
                                                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin mx-auto mb-2" />
                                                    <p className="text-xs sm:text-sm md:text-base">Loading camera...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Camera Controls - Better mobile layout */}
                                    <div className="flex flex-col gap-2 sm:gap-3">
                                        <Button
                                            onClick={capturePhoto}
                                            disabled={!cameraReady}
                                            className="w-full bg-nusa-bronze hover:bg-amber-600 text-white py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            {!cameraReady ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin flex-shrink-0" />
                                                    <span>Please wait...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                                                    <span>Take Photo</span>
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            onClick={stopCamera}
                                            variant="outline"
                                            className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <X className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>Close Camera</span>
                                        </Button>
                                    </div>
                                    {/* Camera Tips */}
                                    <div className="text-center text-xs sm:text-sm text-nusa-brown bg-nusa-gold/10 p-2 sm:p-3 rounded-lg">
                                        <p>Point the camera at the batik pattern and press &quot;Take Photo&quot;</p>
                                    </div>
                                </div>
                            )}

                            {/* IMAGE PREVIEW MODE */}
                            {selectedImage && !isCameraActive && (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="relative">
                                        <img
                                            src={selectedImage || "/placeholder.svg"}
                                            alt="Selected photo"
                                            className="w-full rounded-lg aspect-video object-cover shadow-md"
                                        />
                                        <Button
                                            onClick={resetAll}
                                            variant="outline"
                                            size="sm"
                                            className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 sm:p-2 min-h-[32px] min-w-[32px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </Button>
                                    </div>
                                    {/* Action Buttons */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <Button
                                            onClick={predictBatik}
                                            disabled={isLoading}
                                            className="w-full bg-nusa-gold hover:bg-nusa-bronze text-white py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin flex-shrink-0" />
                                                    <span className="truncate">Analyzing Pattern...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                                                    <span className="truncate">Identify Batik Pattern</span>
                                                </>
                                            )}
                                        </Button>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            <Button
                                                onClick={startCamera}
                                                variant="outline"
                                                className="border-nusa-bronze text-nusa-bronze hover:bg-nusa-bronze/10 bg-transparent text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                                <span className="truncate">Take Another</span>
                                            </Button>
                                            <Button
                                                onClick={() => fileInputRef.current?.click()}
                                                variant="outline"
                                                className="border-nusa-gold text-nusa-gold hover:bg-nusa-gold/10 text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                                <span className="truncate">Upload Other</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* INITIAL STATE */}
                            {!selectedImage && !isCameraActive && (
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Upload Area - Better mobile touch target */}
                                    <div
                                        className="border-2 border-dashed border-nusa-gold/30 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-nusa-gold/50 transition-colors min-h-[120px] sm:min-h-[140px] flex flex-col items-center justify-center touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 lg:mb-4 text-nusa-bronze/50" />
                                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-nusa-darkBrown mb-1 sm:mb-2">
                                            Upload Batik Photo
                                        </h3>
                                        <p className="text-xs sm:text-sm lg:text-base text-nusa-brown mb-2 sm:mb-3 lg:mb-4 px-2">
                                            Click to select photo from gallery
                                        </p>
                                        <p className="text-xs text-nusa-brown/70">Format: JPG, PNG, JPEG</p>
                                    </div>
                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-nusa-gold/20"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs sm:text-sm">
                                            <span className="px-3 sm:px-4 bg-white text-nusa-brown">or</span>
                                        </div>
                                    </div>
                                    {/* Camera Button */}
                                    <Button
                                        onClick={startCamera}
                                        className="w-full bg-nusa-bronze hover:bg-amber-600 text-white py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                                        <span>Open Camera</span>
                                    </Button>
                                    {/* Tips */}
                                    <div className="text-center text-xs sm:text-sm text-nusa-brown/70 bg-nusa-gold/5 p-2 sm:p-3 rounded-lg">
                                        <p>💡 Tip: Use camera for best results with adequate lighting</p>
                                    </div>
                                </div>
                            )}

                            {/* Hidden File Input */}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <Card className="border-nusa-gold/20 shadow-lg overflow-hidden gap-2">
                        <CardHeader className="bg-gradient-to-r from-nusa-green/10 to-nusa-gold/10 p-0 sm:p-4 lg:p-6">
                            <CardTitle className="flex items-center justify-center gap-2 text-nusa-darkBrown text-sm sm:text-base md:text-lg lg:text-xl">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-nusa-green flex-shrink-0" />
                                <span className="truncate min-w-0">Identification Results</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 lg:p-6">
                            {/* No Image State */}
                            {!prediction && !isLoading && !selectedImage && !isCameraActive && !predictionError && (
                                <div className="text-center py-6 sm:py-8 lg:py-12">
                                    <div className="bg-nusa-gold/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-nusa-bronze/50" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-nusa-darkBrown mb-1 sm:mb-2">
                                        No Photo Yet
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-nusa-brown px-2 sm:px-4 leading-relaxed">
                                        Take a photo with camera or upload from gallery to start identification
                                    </p>
                                </div>
                            )}

                            {/* Camera Active State */}
                            {isCameraActive && (
                                <div className="text-center py-6 sm:py-8 lg:py-12">
                                    <div className="bg-nusa-bronze/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-nusa-bronze" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-nusa-darkBrown mb-1 sm:mb-2">
                                        Camera Active
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-nusa-brown px-2 sm:px-4 leading-relaxed">
                                        Point the camera at the batik pattern and take a photo for analysis
                                    </p>
                                </div>
                            )}

                            {/* Image Selected but Not Predicted */}
                            {!prediction && !isLoading && selectedImage && !isCameraActive && !predictionError && (
                                <div className="text-center py-6 sm:py-8 lg:py-12">
                                    <div className="bg-nusa-gold/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-nusa-gold" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-nusa-darkBrown mb-1 sm:mb-2">
                                        Photo Ready for Analysis
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-nusa-brown px-2 sm:px-4 leading-relaxed">
                                        Click &quot;Identify Batik Pattern&quot; to start AI analysis
                                    </p>
                                </div>
                            )}

                            {/* Loading State */}
                            {isLoading && (
                                <div className="text-center py-6 sm:py-8 lg:py-12">
                                    <div className="bg-nusa-bronze/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 animate-spin text-nusa-bronze" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-nusa-darkBrown mb-1 sm:mb-2">
                                        Analyzing Pattern
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-nusa-brown px-2 sm:px-4 leading-relaxed">
                                        AI is identifying batik patterns and motifs...
                                    </p>
                                    <div className="mt-3 sm:mt-4 bg-nusa-gold/10 rounded-lg p-2 sm:p-3 mx-2 sm:mx-0">
                                        <p className="text-xs sm:text-sm text-nusa-brown">⏳ This process takes a few seconds</p>
                                    </div>
                                </div>
                            )}

                            {/* Prediction Error State */}
                            {predictionError && !isLoading && (
                                <div className="text-center py-6 sm:py-8 lg:py-12">
                                    <div className="bg-red-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                                        <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-red-600" />
                                    </div>
                                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-red-800 mb-1 sm:mb-2">
                                        Analysis Failed
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-red-700 px-2 sm:px-4 mb-3 sm:mb-4 break-words">
                                        {predictionError}
                                    </p>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 text-left mx-2 sm:mx-0">
                                        <h4 className="font-semibold text-red-800 mb-2 text-xs sm:text-sm lg:text-base">
                                            Possible causes:
                                        </h4>
                                        <ul className="text-xs sm:text-sm text-red-700 space-y-1 list-disc list-inside leading-relaxed">
                                            <li>Unstable internet connection</li>
                                            <li>Server experiencing issues</li>
                                            <li>Unsupported image format or size</li>
                                            <li>Image too blurry or dark</li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-2 sm:px-0">
                                        <Button
                                            onClick={retryPrediction}
                                            className="bg-nusa-bronze hover:bg-amber-600 text-white text-xs sm:text-sm lg:text-base min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>Try Again</span>
                                        </Button>
                                        <Button
                                            onClick={resetAll}
                                            variant="outline"
                                            className="border-nusa-gold text-nusa-darkBrown hover:bg-nusa-gold/10 text-xs sm:text-sm lg:text-base bg-transparent min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span>Select Another Photo</span>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Prediction Results */}
                            {prediction && !predictionError && (
                                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                                    {/* Pattern Header with Icon */}
                                    <div className="text-center pb-4 border-b border-nusa-gold/20">
                                        <div className="flex items-center justify-center gap-0 mb-3">
                                            <div className="text-3xl sm:text-4xl lg:text-5xl">{prediction.icon}</div>
                                            <div className="text-left">
                                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-nusa-darkBrown break-words leading-tight">
                                                    Batik {prediction.name}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-nusa-brown/70 mt-1">{prediction.origin}</p>
                                            </div>
                                        </div>
                                        <Badge
                                            className={`${getConfidenceColor(prediction.confidence)} px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border`}
                                        >
                                            <Star className="w-3 h-3 mr-1 flex-shrink-0" />
                                            Accuracy: {(prediction.confidence * 100).toFixed(1)}%
                                        </Badge>
                                    </div>

                                    {/* Description Card */}
                                    <div
                                        className={`bg-gradient-to-r ${prediction.color} bg-opacity-10 p-4 sm:p-5 rounded-xl border border-opacity-20`}
                                    >
                                        <h4 className="font-bold text-nusa-darkBrown mb-3 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                                            <div className={`w-3 h-3 bg-gradient-to-r ${prediction.color} rounded-full flex-shrink-0`}></div>
                                            <span>About the Pattern</span>
                                        </h4>
                                        <p className="text-nusa-brown leading-relaxed text-xs sm:text-sm lg:text-base break-words">
                                            {prediction.description}
                                        </p>
                                    </div>

                                    {/* Cultural Significance Card */}
                                    <div className="bg-gradient-to-r from-nusa-green/10 to-emerald-100/50 p-4 sm:p-5 rounded-xl border border-nusa-green/20">
                                        <h4 className="font-bold text-nusa-darkBrown mb-3 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                                            <div className="w-3 h-3 bg-nusa-green rounded-full flex-shrink-0"></div>
                                            <span>Meaning & Philosophy</span>
                                        </h4>
                                        <p className="text-nusa-brown leading-relaxed text-xs sm:text-sm lg:text-base break-words">
                                            {prediction.cultural_significance}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            onClick={resetAll}
                                            className="flex-1 bg-nusa-bronze hover:bg-amber-600 text-white text-xs sm:text-sm lg:text-base min-h-[44px] touch-manipulation cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">Scan Again</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* AI Model Disclaimer */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-100 p-3 sm:p-4 rounded-lg border border-gray-200 mt-4">
                    <div className="flex items-start gap-2 mb-2">
                        <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h5 className="font-semibold text-gray-800 text-xs sm:text-sm">About AI Model</h5>
                            <p className="text-gray-600 text-xs leading-relaxed mt-1">
                                The model uses ResNet50 architecture and is still under development. Prediction results can continue to
                                improve as more data is added. Further use of the model is not limited to batik, but can extend to other
                                cultural artifacts.
                            </p>
                            <p className="text-gray-500 text-xs mt-2">
                                model credit to <span className="font-medium text-gray-700">Stefaron</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hidden Canvas for Image Capture */}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    )
}
