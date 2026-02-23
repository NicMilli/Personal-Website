import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) { return client; }
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials not set");
  }
  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return client;
}

export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  contentType = "image/png"
): Promise<string> {
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!bucket || !publicUrl) { throw new Error("R2_BUCKET_NAME or R2_PUBLIC_URL not set"); }

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `bubbles/${filename}`,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${publicUrl.replace(/\/$/, "")}/bubbles/${filename}`;
}
