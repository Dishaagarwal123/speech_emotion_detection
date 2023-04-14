// Get the buttons and the file input
var recordButton = document.getElementById("record-button");
var stopButton = document.getElementById("stop-button");
var pauseButton = document.getElementById("pause-button");
var playButton = document.getElementById("play-button");
var fileInput = document.getElementById("audio-file");

// Check if the Web Audio API is available
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Enable the record button
    recordButton.disabled = false;

    // Define the constraints for the audio stream
    var constraints = { audio: true };

    // Define the global variables for the recorder and the audio context
    var mediaRecorder = null;
    var audioChunks = [];
    var audioContext = null;
    var audioSource = null;
    var audioBuffer = null;
    var audioBufferSource = null;
    var isPaused = false;

    // Set the click event listener for the record button
    recordButton.addEventListener("click", function() {
        // Disable the record button and enable the stop and pause buttons
        recordButton.disabled = true;
        stopButton.disabled = false;
        pauseButton.disabled = false;

        // Create a new AudioContext object
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Check if a file has been selected
        if (fileInput.files && fileInput.files[0]) {
            // Create a new FileReader object
            var reader = new FileReader();

            // Set the callback function when the file is loaded
            reader.onload = function(event) {
                // Get the audio data from the event
                var audioData = event.target.result;

                // Decode the audio data into an AudioBuffer object
                audioContext.decodeAudioData(audioData, function(buffer) {
                    // Store the AudioBuffer object
                    audioBuffer = buffer;

                    // Enable the play button
                    playButton.disabled = false;
                });
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            // Request access to the microphone
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function(stream) {
                    // Create a new MediaRecorder object
                    mediaRecorder = new MediaRecorder(stream);

                    // Set the callback function when data is available
                    mediaRecorder.ondataavailable = function(event) {
                        // Add the audio data to the chunks array
                        audioChunks.push(event.data);
                    };

                    // Set the callback function when recording stops
                    mediaRecorder.onstop = function() {
                        // Combine the audio chunks into a single Blob object
                        var audioBlob = new Blob(audio)}})}})}
