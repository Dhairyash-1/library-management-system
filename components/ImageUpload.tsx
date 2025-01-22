import React, { useRef, useState } from "react"
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next"
import config from "@/lib/config"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { toast, useToast } from "@/hooks/use-toast"

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }

    const data = await response.json()

    const { signature, expire, token } = data
    return { signature, expire, token }
  } catch (error: any) {
    throw new Error("Authentication request failed", error.message)
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (file: string) => void
}) => {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const type = "Image"
  const onError = (error: any) => {
    console.log(error)

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: "destructive",
    })
  }
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    })
  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault()

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={`text-base text-light-100`}>Upload a file</p>

        {file && <p className={"upload-filename"}>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
