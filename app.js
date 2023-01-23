let fetched = false;
const audioContext = new AudioContext();
const audioBuffers = {};

async function fetchResources() {
    const files = await fetchJSON('list.json');
    for (const file of files) {
        console.log(`正在获取声音资源: ${file}`);
        const arrayBuffer = await fetchArrayBuffer(`resources/${file}`);
        audioBuffers[file.replace('.wav', '')] = await audioContext.decodeAudioData(arrayBuffer);
    }
    fetched = true;
}
async function fetchJSON(url) {
    const response = await fetch(url);
    const JSON = await response.json();
    return JSON;
}
async function fetchArrayBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = response.arrayBuffer();
    return arrayBuffer;
}
window.addEventListener("keydown", (e) => {
    if (audioContext.suspend) {
        audioContext.resume();
    }
    if (fetched == true) {
        const audioSource = audioContext.createBufferSource();
        if (e.key == "1") {
            audioSource.buffer = audioBuffers.C;
            console.log(`播放音频: C`);
        }
        else if (e.key == "2") {
            audioSource.buffer = audioBuffers.D;
            console.log(`播放音频: D`);
        }
        else if (e.key == "3") {
            audioSource.buffer = audioBuffers.E;
            console.log(`播放音频: E`);
        }
        else if (e.key == "4") {
            audioSource.buffer = audioBuffers.F;
            console.log(`播放音频: F`);
        }
        else if (e.key == "5") {
            audioSource.buffer = audioBuffers.G;
            console.log(`播放音频: G`);
        }
        else if (e.key == "6") {
            audioSource.buffer = audioBuffers.A;
            console.log(`播放音频: A`);
        }
        else if (e.key == "7") {
            audioSource.buffer = audioBuffers.B;
            console.log(`播放音频: B`);
        }
        audioSource.connect(audioContext.destination);
        audioSource.start();
    }
    e.preventDefault();
});
window.addEventListener('mousedown', () => {
    let num = Math.floor(Math.random() * 7);
    console.log(num);
    let audioBuffersArray = Object.entries(audioBuffers);
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffersArray[num][1];
    audioSource.connect(audioContext.destination);
    audioSource.start();
});
fetchResources();