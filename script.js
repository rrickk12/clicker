// Initialize variables
let clickCount = 0;
let clickMultiplier = 1;
let autoClickers = 0;
const clickCountElement = document.getElementById('clickCount');
const likeButton = document.getElementById('likeButton');
const autoClickerButton = document.getElementById('autoClickerButton');
let videoLikes = 0;
let videoDislikes = 0;
const videoLikesElement = document.getElementById('videoLikes');
const videoDislikesElement = document.getElementById('videoDislikes');

// document.getElementById('videoLikeButton').addEventListener('click', function() {
//   videoLikes++;
//   videoLikesElement.innerText = videoLikes;
// });

// document.getElementById('videoDislikeButton').addEventListener('click', function() {
//   videoDislikes++;
//   videoDislikesElement.innerText = videoDislikes;
// });

// Event listener for the Like button
likeButton.addEventListener('click', function() {
    clickCount += clickMultiplier;
    updateClickCount();
  });
// Update upcoming upgrades based on player progress
function updateUpcomingUpgrades() {
    const upcomingUpgradesElement = document.getElementById('upcomingUpgrades');
    
    // Clear current list
    upcomingUpgradesElement.innerHTML = '';
  
    upgrades.forEach((upgrade) => {
        if (clickCount < upgrade.cost) {
            upcomingUpgradesElement.innerHTML += `<li>${upgrade.name}: ${upgrade.cost} clicks</li>`;
        }
    });
}
// Function to update the character based on click count
function updateCharacter() {
    const characterImage = document.getElementById('characterImage');
    
    if (clickCount < 50) {
      characterImage.src = 'happy_character_image.png';
    } else if (clickCount < 100) {
      characterImage.src = 'excited_character_image.png';
    } else {
      characterImage.src = 'amazed_character_image.png';
    }
  }
  
// Event listener for the auto-clicker purchase button
autoClickerButton.addEventListener('click', function() {
  if (clickCount >= 10) {
    autoClickers++;
    clickCount -= 10;
    updateClickCount();
  }
});

// Function to update the displayed click count
function updateClickCount() {
    clickCountElement.innerText = clickCount;
    updateUpgradeShop(); // Update the shop each time the click count changes
    updateCharacter(); // Update the character each time the click count changes
  }
// Function to automate clicking
function autoClick() {
  clickCount += autoClickers;
  updateClickCount();
}

// Define upgrades
const upgrades = [
    {
      name: 'Double Clicker',
      cost: 20,
      effect: () => {
        clickMultiplier *= 2;
      }
    },
    {
      name: 'Auto Miner',
      cost: 50,
      effect: () => {
        autoClickers += 1;
      }
    },
    {
      name: 'Mega Boost',
      cost: 100,
      effect: () => {
        clickMultiplier *= 5;
      }
    },
    // Add more upgrades here...
  ];

  
  // Function to update the displayed upgrade shop
  function updateUpgradeShop() {
    const upgradesShop = document.getElementById('upgradesShop');
    upgradesShop.innerHTML = ''; // Clear existing upgrades
    
    upgrades.forEach((upgrade) => {
      // Check if the player can afford this upgrade
      if (clickCount >= upgrade.cost) {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgradeItem';
        upgradeDiv.innerHTML = `
          <strong>${upgrade.name}</strong><br>
          Cost: ${upgrade.cost} clicks
        `;
  
        upgradeDiv.addEventListener('click', function() {
          clickCount -= upgrade.cost;  // Subtract the cost from total clicks
          upgrade.effect();  // Apply the upgrade effect
          updateClickCount();  // Update the displayed click count and shop
        });
        
        // Append this div to the shop
        upgradesShop.appendChild(upgradeDiv);
      }
    });
  }
  
  // Function to update the displayed click count and upgrades
  function updateClickCount() {
    clickCountElement.innerText = clickCount;
    updateUpgradeShop();  // Update the shop each time the click count changes
  }
  
  
// Initialize upgrade shop
updateUpgradeShop();
updateClickCount();

// Call autoClick function every second
setInterval(autoClick, 1000);
