import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);


export default function UploadCareUploader(){

    <lr-config
    ctx-name="my-uploader"
    pubkey="4a403e611147e7f74702"
    maxLocalFileSizeBytes={10000000}
    imgOnly={true}
    sourceList="local, url, camera, dropbox"
></lr-config>


return (
    <>
        <div>
        <lr-file-uploader-regular
            css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.32.4/web/lr-file-uploader-regular.min.css"
            ctx-name="my-uploader"
            class="my-config"
        >
        </lr-file-uploader-regular>
        </div>
    </>
)
}