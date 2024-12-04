  const imagePairs = [
    {
      ai: 'images/image_ai.webp',
      human: 'images/image_h.webp',
      aiAnnotated: 'images/image_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red square: unrealistic scenario(truck floating on river), 2) Blue square: lacking detail(liberty face is lacking facial details)',
      citation: 'https://www.britannica.com/topic/Statue-of-Liberty'
    },
    {
      ai: 'images/image1_ai.png',
      human: 'images/image1_h.jpg',
      aiAnnotated: 'images/image1_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red square: disfigured physical figures(smudged faces), 2) Blue square: unrealistic scenarios(sand showing, tail looks like leg)',
      citation: 'https://www.boredpanda.com/jumping-cats/'
    },
    {
      ai: 'images/image2_ai.png',
      human: 'images/image2_h.webp',
      aiAnnotated: 'images/image2_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red Square: Unrealistic lighting situations(strange reflections from hood to windshield',
    citation:
        'https://www.allaboutcircuits.com/technical-articles/teslas-towers-pikes-peak-wardenclyffe-and-wireless-power-transmission/'
    },
    {
      ai: 'images/image3_ai.png',
      human: 'images/image3_h.jpg',
      aiAnnotated: 'images/image3_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red Squares: disfigured physical figures(smudged faces, 6 fingers, fading fingers), 2) Blue Squares: jumbled texts',
      citation: 'https://www.flickr.com/photos/132863612@N06/24178812494'
    },
    {
      ai: 'images/image4_ai.png',
      human: 'images/image4_h.webp',
      aiAnnotated: 'images/image4_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red square: lacking detail(both UGA and Georgia Tech uniforms lack detail in color), 2) Blue square: jumbled text, 3) Green square: unrealistic scenarios(TV looks like it has two screens)',
      citation:
        'https://www.cbssports.com/college-football/news/college-football-schedule-games-2024-what-to-watch-in-week-7-tv-channels-saturday-kickoff-times/'
    },
    {
      ai: 'images/image5_ai.png',
      human: 'images/image5_h.avif',
      aiAnnotated: 'images/image5_ai_box.png',
      AnnotatedGuides: 'Features: 1) Green square: jumbled text(also logo on TV)',
      citation:
        'https://www.dc.com/blog/2018/10/11/its-time-to-discover-or-rediscover-the-teen-titans-animated-series/'
    },
    {
      ai: 'images/image6_ai.png',
      human: 'images/image6_h.webp',
      aiAnnotated: 'images/image6_ai_box.png',
      AnnotatedGuides: 'Features: 1) Red square: disfigured figures(squashed face), 2) Blue squares: jumbled text',
      citation: 'https://batman.fandom.com/wiki/Gotham_City_(Arkhamverse)'
    }
  ];

  let currentIndex = 0;
  let correctCount = 0;
  let totalSeconds = 300; // 5 minutes
  let timerInterval;

  // Shuffle image pairs
  function shuffleImages() {
    for (let i = imagePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
    }
  }

  // Initialize quiz
  function initializeQuiz() {
    shuffleImages();
    currentIndex = 0;
    correctCount = 0;
    document.getElementById('next-question-btn').disabled = true;
    startTimer();
    loadNextQuestion();
  }

  // Start timer
  function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
      } else {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }, 1000);
  }

  // Stop timer
  function stopTimer() {
    clearInterval(timerInterval);
  }

  // Resume timer
  function resumeTimer() {
    startTimer();
  }

  // Load next question
  function loadNextQuestion() {
    if (currentIndex >= imagePairs.length) {
      finishQuiz();
      return;
    }

    const pair = imagePairs[currentIndex];
    const isAIOnLeft = Math.random() < 0.5;

    // Assign images to left and right
    document.getElementById('image1').src = isAIOnLeft ? pair.ai : pair.human;
    document.getElementById('image2').src = isAIOnLeft ? pair.human : pair.ai;

    // Reset states
    document.getElementById('image1').className = '';
    document.getElementById('image2').className = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-question-btn').disabled = true;

    // Hide the "See Explanation" button
    document.getElementById('see-explanation-btn').style.display = 'none';

    // Enable clicks
    document.getElementById('image1').style.pointerEvents = 'auto';
    document.getElementById('image2').style.pointerEvents = 'auto';

    // Set click event listeners
    document.getElementById('image1').onclick = () =>
      handleSelection('image1', isAIOnLeft ? 'ai' : 'human');
    document.getElementById('image2').onclick = () =>
      handleSelection('image2', isAIOnLeft ? 'human' : 'ai');

    currentIndex++;
  }

  // Handle image selection
  function handleSelection(selectedId, imageType) {
    // Disable further clicks
    document.getElementById('image1').style.pointerEvents = 'none';
    document.getElementById('image2').style.pointerEvents = 'none';

    const feedback = document.getElementById('feedback');

    if (imageType === 'ai') {
      feedback.textContent = 'Correct! You selected the AI-generated image.';
      feedback.style.color = 'green';
      document.getElementById(selectedId).classList.add('correct');
      correctCount++;
    } else {
      feedback.textContent = 'Incorrect. That is a human-generated image.';
      feedback.style.color = 'red';
      document.getElementById(selectedId).classList.add('incorrect');
    }

    // Enable "Next Question" button
    document.getElementById('next-question-btn').disabled = false;

    // Show the "See Explanation" button
    document.getElementById('see-explanation-btn').style.display = 'block';
  }

  // Show explanation
  function showExplanation() {
    stopTimer(); // Pause the timer
  
    const pair = imagePairs[currentIndex - 1]; // Get the current pair
    const annotatedImage = document.getElementById('annotated-image');
    const guideText = document.getElementById('annotated-guide'); // Guide text element
  
    // Set annotated image and guide text
    annotatedImage.src = pair.aiAnnotated;
    guideText.textContent = pair.AnnotatedGuides;
  
    // Show explanation section
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('explanation-section').style.display = 'block';
  }
  

  // Load next question from explanation
  function loadNextQuestionFromExplanation() {
    document.getElementById('explanation-section').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    resumeTimer(); // Restart the timer
    loadNextQuestion(); // Load the next question
  }

  // Finish quiz
  function finishQuiz() {
    clearInterval(timerInterval);
    alert(`Quiz completed! You scored ${correctCount} out of ${imagePairs.length}.`);
    showLeaderboard();
  }

  // Show leaderboard
  function showLeaderboard() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    const usernameForm = document.getElementById('username-form');
    usernameForm.onsubmit = function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      addToLeaderboard(username);
    };
  }

  // Add to leaderboard
  function addToLeaderboard(username) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, correctCount, timeTaken: 300 - totalSeconds });
    leaderboard.sort((a, b) =>
      b.correctCount === a.correctCount
        ? a.timeTaken - b.timeTaken
        : b.correctCount - a.correctCount
    );
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
  }

  // Display leaderboard
  function displayLeaderboard() {
    document.getElementById('username-form').style.display = 'none';
    document.getElementById('rankings').style.display = 'block';
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';
    leaderboard.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.username} - ${entry.correctCount} correct, ${formatTime(entry.timeTaken)}`;
      leaderboardList.appendChild(li);
    });
  }

  // Format time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  // Restart quiz
  function restartQuiz() {
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('leaderboard').style.display = 'none';
    initializeQuiz();
  }

  // Reset leaderboard
  function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
    document.getElementById('leaderboard-list').innerHTML = '';
    alert('Leaderboard has been reset!');
  }

  // Initialize quiz on page load
  initializeQuiz();
