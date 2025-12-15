import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

const ScanModal = ({ isOpen, onClose, onScanComplete }) => {
    const [cameraStream, setCameraStream] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [error, setError] = useState(null);
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Check camera permission and stop camera when modal closes
    useEffect(() => {
        if (!isOpen) {
            stopCamera();
        }
    }, [isOpen]);

    // Handle video element when camera stream is available
    useEffect(() => {
        if (videoRef.current && cameraStream) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [cameraStream]);

    const startCamera = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Check if browser supports mediaDevices
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera not supported in this browser');
            }
            
            // Request camera permission
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });

            setCameraStream(stream);
            setHasPermission(true);
            setIsCameraActive(true);
            setIsLoading(false);

            // Ensure video plays after getting stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch(err => {
                    console.error('Video play error:', err);
                    setError('Failed to start camera preview');
                });
            }
        } catch (err) {
            console.error('Camera access error:', err);
            setError(getCameraErrorMessage(err));
            setIsCameraActive(false);
            setIsLoading(false);
            setHasPermission(false);
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => {
                track.stop();
            });
            setCameraStream(null);
            setIsCameraActive(false);
        }
    };

    const getCameraErrorMessage = (error) => {
        switch (error.name) {
            case 'NotAllowedError':
            case 'PermissionDeniedError':
                return 'Camera access was denied. Please enable camera permissions in your browser settings.';
            case 'NotFoundError':
            case 'DevicesNotFoundError':
                return 'No camera found. Please connect a camera and try again.';
            case 'NotReadableError':
            case 'TrackStartError':
                return 'Camera is already in use by another application.';
            case 'OverconstrainedError':
                return 'Camera does not support requested constraints.';
            case 'SecurityError':
                return 'Camera access is blocked for security reasons.';
            default:
                return 'Unable to access camera. Please try again.';
        }
    };

    const handleStartScanning = async () => {
        await startCamera();
    };

    const handleTakePhoto = () => {
        if (!videoRef.current || !canvasRef.current || !cameraStream) {
            setError('Camera not ready. Please start camera first.');
            return;
        }

        setIsTakingPhoto(true);
        
        // Get video dimensions
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // Ensure video is playing and has valid dimensions
        if (!video.videoWidth || !video.videoHeight) {
            setError('Camera preview not available. Please try again.');
            setIsTakingPhoto(false);
            return;
        }
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simulate scanning process
        setTimeout(() => {
            setIsTakingPhoto(false);
            simulateBarcodeDetection();
        }, 1500);
    };

    const simulateBarcodeDetection = () => {
        const mockDetections = [
            {
                id: 'med-001',
                name: 'Paracetamol 500mg',
                brand: 'Cipla',
                price: '₹15.00',
                strength: '500mg',
                type: 'Tablet',
                img: 'https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=P'
            }
        ];

        if (onScanComplete) {
            onScanComplete(mockDetections);
        }
        
        // Close modal after delay
        setTimeout(() => {
            onClose();
            stopCamera();
        }, 2000);
    };

    const handleRetryCamera = () => {
        stopCamera();
        startCamera();
    };

    const handleManualInput = () => {
        alert('Redirecting to manual input...');
        onClose();
        stopCamera();
    };

    const handleCloseModal = () => {
        stopCamera();
        onClose();
    };

    // Test function to check camera support
    const checkCameraSupport = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleCloseModal} 
            title="Scan Medicine"
            size="lg"
        >
            <div className="text-center">
                {/* Camera Preview */}
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden mb-4 border-2 border-gray-200">
                    {isCameraActive ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover transform scale-x-[-1]"
                                style={{
                                    transform: 'scaleX(-1)', // Mirror the video for better UX
                                    backgroundColor: '#000' // Fallback black background
                                }}
                                onLoadedData={() => console.log('Video loaded')}
                                onError={(e) => {
                                    console.error('Video error:', e);
                                    setError('Failed to load camera preview');
                                }}
                            />
                            
                            {/* Scanning overlay */}
                            {isTakingPhoto ? (
                                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-white font-semibold text-lg">Scanning...</p>
                                        <p className="text-gray-300 text-sm mt-1">Analyzing medicine information</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Scanning Guide Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="relative w-48 h-48">
                                            {/* Outer border */}
                                            <div className="absolute inset-0 border-2 border-green-400 border-dashed rounded-lg opacity-70"></div>
                                            {/* Corner markers */}
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400"></div>
                                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400"></div>
                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400"></div>
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Camera status indicator */}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        <span>LIVE</span>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-white font-medium">Initializing camera...</p>
                                    <p className="text-gray-400 text-sm mt-1">Please allow camera access if prompted</p>
                                </div>
                            ) : error ? (
                                <div className="text-center p-4">
                                    <div className="text-5xl mb-4">⚠️</div>
                                    <p className="text-red-300 font-medium mb-3">{error}</p>
                                    {checkCameraSupport() ? (
                                        <button
                                            onClick={handleRetryCamera}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                                        >
                                            Try Again
                                        </button>
                                    ) : (
                                        <p className="text-yellow-300 text-sm">Your browser doesn't support camera access</p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="text-4xl">📷</div>
                                    </div>
                                    <p className="text-white text-lg font-medium mb-2">Ready to Scan Medicine</p>
                                    <p className="text-gray-300 text-sm mb-6">Click "Start Camera" to begin scanning</p>
                                    <div className="flex items-center justify-center gap-3 text-gray-400 text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            Quick scan
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Get details
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            Easy checkout
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Hidden canvas for photo capture */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Camera not supported warning */}
                {!checkCameraSupport() && (
                    <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <p className="text-yellow-700 text-sm font-medium">Camera not supported</p>
                                <p className="text-yellow-600 text-xs">Use HTTPS or a modern browser that supports camera access</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="mb-6">
                    {isCameraActive ? (
                        <>
                            <p className="text-gray-700 mb-3 font-medium">
                                Align medicine barcode within the frame
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Good lighting
                                </span>
                                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Steady hand
                                </span>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Clear barcode
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 text-sm">
                                Scan medicine barcodes to quickly get product information, pricing, and availability.
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-4">
                    <button 
                        onClick={handleCloseModal}
                        className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 py-3.5 rounded-xl font-semibold hover:bg-gray-50 active:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        disabled={isTakingPhoto || isLoading}
                    >
                        Cancel
                    </button>
                    
                    {isCameraActive ? (
                        <button 
                            onClick={handleTakePhoto}
                            disabled={isTakingPhoto}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isTakingPhoto ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Scanning...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Take Photo
                                </span>
                            )}
                        </button>
                    ) : (
                        <button 
                            onClick={handleStartScanning}
                            disabled={isLoading || !checkCameraSupport()}
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Starting...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Start Camera
                                </span>
                            )}
                        </button>
                    )}
                </div>

                {/* Tips & Support Section */}
                <div className="mt-6 space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-blue-800 text-sm mb-2">Scanning Tips</h4>
                                <ul className="text-xs text-blue-700 space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1"></div>
                                        <span>Hold camera 6-12 inches from medicine</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1"></div>
                                        <span>Ensure barcode is clean and undamaged</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1"></div>
                                        <span>Use natural light or turn on room lights</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1"></div>
                                        <span>Keep phone steady for clear scan</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Troubleshooting */}
                    {!isCameraActive && checkCameraSupport() && (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 text-center">
                                Camera not working?{' '}
                                <button
                                    onClick={() => {
                                        alert('1. Check browser permissions\n2. Ensure no other app is using camera\n3. Try refreshing the page\n4. Use a different browser');
                                    }}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Get help
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ScanModal;