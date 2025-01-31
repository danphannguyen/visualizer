import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

export const fetchMetadata = async (TRACKS, tracks, setTracks) => {
  const promises = TRACKS.map(
    (track) =>
      new Promise((resolve, reject) => {
        // get duration
        const audio = new Audio(track.path);
        audio.addEventListener("loadedmetadata", () => {
          // Fetch the MP3 file as a Blob
          fetch(track.path)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${track.path}`);
              }
              return response.blob();
            })
            .then((blob) => {
              // Read metadata from the Blob
              jsmediatags.read(blob, {
                onSuccess: (tag) => {
                  const { title, artist, album, picture } = tag.tags;
                  // Extract cover image if it exists
                  let cover = "https://placehold.co/600x400";
                  if (picture) {
                    const base64String = btoa(
                      picture.data
                        .map((char) => String.fromCharCode(char))
                        .join("")
                    );
                    cover = `data:${picture.format};base64,${base64String}`;
                  }
                  let _artists = [];
                  if (artist) {
                    _artists = artist.split(",");
                  }

                  resolve({
                    index: track.id,
                    name: track.name,
                    title: title || track.name,
                    duration: audio.duration,
                    artists: _artists || [],
                    album: album || "Unknown Album",
                    path: track.path,
                    cover,
                  });
                },
                onError: (error) => {
                  console.error(
                    `Error reading metadata for ${track.name}:`,
                    error
                  );
                  resolve({
                    index: track.id,
                    name: track.name,
                    title: track.name,
                    duration: audio.duration,
                    artists: [],
                    album: "Unknown Album",
                    path: track.path,
                    cover,
                  });
                },
              });
            })
            .catch((error) => {
              console.error(`Failed to fetch ${track.name}:`, error);
              reject(error);
            });
        });
      })
  );
  try {
    const results = await Promise.all(promises);

    // récupérer le tableau de tracks du store existant
    const _tracks = [...tracks];

    // pour chaque track processed par la librairie pour récupérer les metadata
    results.forEach((result) => {
      _tracks.push(result);
    });

    // màj le store
    setTracks(_tracks);

    // _tracks.push(results)
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }
};
