"use client"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface UploadedFile {
    id: string
    file: File
    preview: string
}

export function MultipleFileUpload() {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const newFile: UploadedFile = {
                        id: Math.random().toString(36).substr(2, 9),
                        file,
                        preview: e.target?.result as string,
                    }
                    setUploadedFiles((prev) => [...prev, newFile])
                }
                reader.readAsDataURL(file)
            }
        })

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        const files = event.dataTransfer.files

        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const newFile: UploadedFile = {
                        id: Math.random().toString(36).substr(2, 9),
                        file,
                        preview: e.target?.result as string,
                    }
                    setUploadedFiles((prev) => [...prev, newFile])
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
    }

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Upload Proof (optional)</Label>

            <div className="flex items-center gap-3 flex-wrap">
                {/* Display uploaded images */}
                {uploadedFiles.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="relative group">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                            <img
                                src={uploadedFile.preview || "/placeholder.svg"}
                                alt="Uploaded proof"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {/* Upload button - always on the right */}
                <div
                    className="w-24 h-20 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-white"
                    onClick={handleBrowseClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Upload className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Browse button and file size info */}
            <div className="w-24 text-center">
                <span onClick={handleBrowseClick} className="underline cursor-pointer">Browse</span>
                <p className="text-[10px] text-gray-500">Max file size 50MB</p>
            </div>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>
    )
}
