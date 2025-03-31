"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [transformProgress, setTransformProgress] = useState(0)
  const [showPrank, setShowPrank] = useState(false)
  const [currentStep, setCurrentStep] = useState("home") // home, upload, uploading, transforming, prank

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setCurrentStep("uploading")

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setCurrentStep("transforming")
          simulateTransform()
        }
      }, 150)
    }
  }

  // Simulate transformation progress
  const simulateTransform = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 3
      setTransformProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setCurrentStep("prank")
        setShowPrank(true)
      }
    }, 200)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white text-gray-800">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2">Ghibli Art Generator</h1>
          <p className="text-gray-500">Transform your photos into beautiful Ghibli-style portraits</p>
        </div>

        {currentStep === "home" && (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
            <h2 className="text-xl font-medium mb-4">Ghibli Style Examples</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/1.jpg?height=200&width=200"
                  alt="Ghibli Style Example 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/2.jpg?height=200&width=200"
                  alt="Ghibli Style Example 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/3.jpg?height=200&width=200"
                  alt="Ghibli Style Example 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/4.jpg?height=200&width=200"
                  alt="Ghibli Style Example 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Button onClick={() => setCurrentStep("upload")} className="w-full">
              Generate Now
            </Button>
          </div>
        )}

        {currentStep === "upload" && (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
            <div className="mb-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Upload your photo</h2>
            <p className="text-gray-500 mb-4">Select a clear portrait for best results</p>
            <Button variant="outline" onClick={() => document.getElementById("file-input")?.click()} className="w-full">
              Select Image
            </Button>
            <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        )}

        {currentStep === "uploading" && (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="mb-6">
              {previewUrl && (
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={previewUrl || "/1.jpg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-medium mb-4 text-center">Uploading your image...</h2>
            <Progress value={uploadProgress} className="h-2 mb-2" />
            <p className="text-right text-sm text-gray-500">{uploadProgress}%</p>
          </div>
        )}

        {currentStep === "transforming" && (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="mb-6">
              {previewUrl && (
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={previewUrl || "/1.jpg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-medium mb-4 text-center">Transforming to Ghibli style...</h2>
            <Progress value={transformProgress} className="h-2 mb-2" />
            <p className="text-right text-sm text-gray-500">{transformProgress}%</p>
          </div>
        )}

        {currentStep === "prank" && (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
            <div className="aspect-video w-full mb-4 overflow-hidden rounded-md">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/KaydsM1q_K0?autoplay=1"
                title="Rick Astley - Never Gonna Give You Up"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video"
              ></iframe>
            </div>
            <h2 className="text-xl font-medium mb-2"> বাল ছেঁড়ো 😂</h2>
            <p className="text-gray-500 mb-4">মজা পেয়েছ তো সোনা!</p>
            <Button
              onClick={() => {
                setSelectedImage(null)
                setPreviewUrl(null)
                setUploadProgress(0)
                setTransformProgress(0)
                setShowPrank(false)
                setCurrentStep("home")
              }}
            >
              Try again
            </Button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Created with ❤️ By Sayan Sarkar</p>
        </div>
      </div>
    </main>
  )
}

