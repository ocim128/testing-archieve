async function compressAndEncode(input) {
    // Convert input string to Uint8Array
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(input);

    // Compress the Uint8Array using CompressionStream (gzip)
    const compressedStream = new Blob([uint8Array]).stream().pipeThrough(new CompressionStream('gzip'));
    const compressedResponse = new Response(compressedStream);
    const compressedArrayBuffer = await compressedResponse.arrayBuffer();

    // Convert compressed ArrayBuffer to Base64
    const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(compressedArrayBuffer)));

    return base64String;
}

// Usage
const originalString = "This is a test string for compression and encoding.";
compressAndEncode(originalString).then(encoded => {
    console.log("Original:", originalString);
    console.log("Encoded:", encoded);
});