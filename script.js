let selectedImage = null;

// Add event listeners to images
document.getElementById('image1').addEventListener('click', function () {
  selectImage('image1');
});

document.getElementById('image2').addEventListener('click', function () {
  selectImage('image2');
});

function selectImage(imageId) {
  selectedImage = imageId;

  // Remove 'selected' class from both images
  document.getElementById('image1').classList.remove('selected');
  document.getElementById('image2').classList.remove('selected');

  // Add 'selected' class to the clicked image
  document.getElementById(imageId).classList.add('selected');
}

function submitAnswer() {
  if (!selectedImage) {
    alert('Please select an image.');
    return;
  }

  // Assume 'image1' is the AI-generated image
  const isCorrect = selectedImage === 'image1';
  let resultText = '';

  if (isCorrect) {
    resultText =
      "Correct! The image on the left is the AI-generated. You can tell by the fact that there's a car floating perfectly on the water. The image on the right is from <br>© GCShutter —E+/Getty Images";
  } else {
    resultText = 'Incorrect. Try again!';
  }

  document.getElementById('result').innerHTML = resultText;
}

// Navbar Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar ul li a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});
