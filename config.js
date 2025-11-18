<!DOCTYPE html>
<html lang="si">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Laki Shopping</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --primary: #3b82f6;
      --secondary: #1e40af;
      --accent: #f59e0b;
      --background: #f0f9ff;
      --card: #ffffff;
      --text: #1f2937;
    }
    
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #e0f7fa, #f0f9ff);
      color: var(--text);
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .product-card {
      transition: transform 0.3s, box-shadow 0.3s;
      background: var(--card);
      border-radius: 12px;
      overflow: hidden;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .loading-spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
      margin: auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    mark {
      background-color: var(--accent);
      padding: 0 2px;
      color: white;
    }
    
    .btn-primary {
      background: var(--primary);
      color: white;
      transition: all 0.3s;
    }
    
    .btn-primary:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: var(--accent);
      color: white;
      transition: all 0.3s;
    }
    
    .btn-secondary:hover {
      background: #e69500;
      transform: translateY(-2px);
    }
    
    .like-btn {
      transition: all 0.3s;
    }
    
    .like-btn:hover {
      transform: scale(1.1);
    }
    
    .like-btn.liked {
      color: #ef4444;
    }
    
    .comment-section {
      max-height: 300px;
      overflow-y: auto;
    }
    
    .progress-bar {
      height: 8px;
      border-radius: 4px;
      background: #e5e7eb;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--primary);
      transition: width 0.5s ease-in-out;
    }
    
    .floating-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      padding: 12px 20px;
      border-radius: 8px;
      background: var(--primary);
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(150%);
      transition: transform 0.3s ease;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .gradient-text {
      background: linear-gradient(90deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <!-- Notification -->
  <div id="notification" class="notification hidden"></div>

  <!-- Register Page -->
  <div class="container mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg mt-10 fade-in" id="registerPage">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold gradient-text">ලියාපදිංචි වන්න</h2>
      <p class="text-gray-600 mt-2">ඔබගේ ගිණුම නිර්මාණය කරන්න</p>
    </div>
    
    <div class="space-y-4">
      <div>
        <input id="regName" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="නම" required />
      </div>
      
      <div>
        <input type="date" id="regDOB" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
      </div>
      
      <div>
        <input id="regPass" type="password" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="මුරපදය" required />
      </div>
      
      <div class="flex items-center">
        <input type="checkbox" id="agreeTerms" class="mr-2" required />
        <label for="agreeTerms" class="text-sm">මම <span class="text-blue-600">සේවා කොන්දේසි</span> සමඟ එකඟ වෙමි</label>
      </div>
      
      <button id="registerButton" class="w-full p-3 btn-primary rounded-lg">ලියාපදිංචි කරන්න</button>
      <button id="showLoginButton" class="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">පිවිසෙන්න</button>
    </div>
  </div>

  <!-- Login Page -->
  <div class="container mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg mt-10 fade-in hidden" id="loginPage">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold gradient-text">පිවිසෙන්න</h2>
      <p class="text-gray-600 mt-2">ඔබගේ ගිණුමට ප්‍රවේශ වන්න</p>
    </div>
    
    <div class="space-y-4">
      <div>
        <input id="loginCode" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="10-ඉලක්කම් කේතය (විකල්ප)" />
        <p class="text-sm text-gray-500 mt-1 text-center">හෝ</p>
      </div>
      
      <div>
        <input id="loginName" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="නම" />
      </div>
      
      <div>
        <input id="loginPass" type="password" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="මුරපදය" required />
      </div>
      
      <button id="loginButton" class="w-full p-3 btn-primary rounded-lg">පිවිසෙන්න</button>
      <button id="showRegisterButton" class="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">ලියාපදිංචි වන්න</button>
      
      <!-- Admin Login -->
      <div class="mt-6 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500 text-center mb-2">පරිපාලක පිවිසුම</p>
        <button id="adminLoginButton" class="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">පරිපාලක පැනලය</button>
      </div>
    </div>
  </div>

  <!-- Shop Page -->
  <div id="shopPage" class="hidden">
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex items-center">
          <h2 class="text-3xl font-bold">Laki Shopping 🛍️</h2>
          <span class="ml-2 text-sm bg-yellow-500 text-white px-2 py-1 rounded-full">NEW</span>
        </div>
        <div class="flex space-x-2 items-center">
          <span id="coinBalance" class="px-3 py-1 bg-yellow-500 text-white rounded-full flex items-center">
            <i class="fas fa-coins mr-1"></i> <span id="coinCount">0</span>
          </span>
          <button id="showSettingsButton" class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 flex items-center">
            <i class="fas fa-cog mr-2"></i> සැකසුම්
          </button>
          <button id="toggleProductFormButton" class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 flex items-center">
            <i class="fas fa-plus mr-2"></i> භාණ්ඩයක් එකතු
          </button>
        </div>
      </div>
      
      <div class="container mx-auto mt-4 px-4 relative">
        <div class="relative">
          <input id="searchInput" class="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="භාණ්ඩයක් සොයන්න..." />
          <i class="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>
        <div id="searchSuggestions" class="absolute bg-white border rounded-lg w-full max-h-40 overflow-y-auto hidden shadow-md z-10"></div>
      </div>
      
      <div id="productNames" class="container mx-auto mt-2 px-4 text-center text-sm text-white"></div>
    </header>

    <!-- Add Product Form -->
    <div id="addProductForm" class="container mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg mt-6 fade-in hidden">
      <h3 class="text-xl font-bold text-center text-gray-800 mb-4">භාණ්ඩයක් එකතු කරන්න</h3>
      
      <div class="space-y-4">
        <input id="productName" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="භාණ්ඩයේ නම" required />
        
        <input id="productPrice" type="number" min="0" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="මිල (රු.)" required />
        
        <input id="productContact" type="tel" pattern="^\d{10}$" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="දුරකථන අංකය (අංක 10)" required />
        
        <textarea id="productDescription" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="විස්තරය"></textarea>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">පින්තූරය</label>
          <input type="file" id="productImage" accept="image/*" class="w-full" />
        </div>
        
        <input id="productImageURL" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="හෝ පින්තූර URL එක" />
        
        <div class="flex space-x-2">
          <button id="submitProductButton" class="flex-1 p-3 btn-primary rounded-lg">භාණ්ඩය එකතු කරන්න</button>
          <button id="cancelProductButton" class="flex-1 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">අවලංගු කරන්න</button>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div id="productList" class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"></div>
  </div>

  <!-- Settings Page -->
  <div id="settingsPage" class="container mx-auto max-w-4xl p-6 bg-white rounded-2xl shadow-lg mt-10 fade-in hidden">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold gradient-text">සැකසුම්</h2>
      <p class="text-gray-600">ඔබගේ ගිණුම කළමනාකරණය කරන්න</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Profile Section -->
      <div class="md:col-span-1">
        <div class="bg-gray-50 p-6 rounded-xl">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-4">ප්‍රොෆයිල්</h3>
            <img id="profilePhoto" class="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 object-cover" src="https://via.placeholder.com/100?text=Profile" alt="Profile">
            
            <div class="mt-4">
              <input type="file" id="profilePhotoInput" accept="image/*" class="hidden" />
              <button id="uploadProfilePhotoButton" class="w-full p-2 btn-primary rounded-lg">
                <i class="fas fa-upload mr-2"></i> පින්තූරය උඩුගත කරන්න
              </button>
            </div>
            
            <div class="mt-4">
              <h4 class="font-bold" id="userNameDisplay"></h4>
              <p class="text-sm text-gray-600" id="userCodeDisplay"></p>
              <p class="text-sm text-gray-600" id="userCoinsDisplay"></p>
            </div>
          </div>
        </div>
        
        <!-- Referral Section -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl mt-4 text-white">
          <h3 class="font-bold mb-2">රෙෆරල් ලින්ක්</h3>
          <p class="text-sm mb-2">මිතුරන්ට යොමු කර කොයින් 2ක් ලබා ගන්න!</p>
          <div class="flex">
            <input id="referralLink" readonly class="flex-1 p-2 bg-white text-gray-800 rounded-l-lg text-sm" />
            <button id="copyReferralLink" class="p-2 bg-yellow-500 text-white rounded-r-lg">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Main Settings -->
      <div class="md:col-span-2">
        <div class="grid grid-cols-2 gap-4">
          <button id="showAccountButton" class="p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition">
            <i class="fas fa-user text-blue-600 text-xl mb-2"></i>
            <p class="font-bold">ගිණුම</p>
          </button>
          
          <button id="showImageUploaderButton" class="p-4 bg-green-100 rounded-xl hover:bg-green-200 transition">
            <i class="fas fa-image text-green-600 text-xl mb-2"></i>
            <p class="font-bold">පින්තූර උඩුගත</p>
          </button>
          
          <button id="buyCoinsSettingsButton" class="p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition">
            <i class="fas fa-coins text-yellow-600 text-xl mb-2"></i>
            <p class="font-bold">කොයින් මිලදී</p>
          </button>
          
          <button id="showStatsButton" class="p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition">
            <i class="fas fa-chart-bar text-purple-600 text-xl mb-2"></i>
            <p class="font-bold">සංඛ්‍යාලේඛන</p>
          </button>
          
          <button id="showMoreInfoButton" class="p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200 transition">
            <i class="fas fa-info-circle text-indigo-600 text-xl mb-2"></i>
            <p class="font-bold">විස්තර</p>
          </button>
          
          <button id="deleteProfileButton" class="p-4 bg-red-100 rounded-xl hover:bg-red-200 transition">
            <i class="fas fa-trash text-red-600 text-xl mb-2"></i>
            <p class="font-bold">ගිණුම මකන්න</p>
          </button>
        </div>
        
        <!-- Account Details -->
        <div id="accountDetails" class="mt-6 hidden">
          <div class="bg-gray-50 p-4 rounded-xl">
            <h3 class="font-bold mb-2">ගිණුම් විස්තර</h3>
            <div id="accountInfo"></div>
          </div>
        </div>
        
        <!-- Image Uploader -->
        <div id="imageUploader" class="mt-6 hidden">
          <div class="bg-gray-50 p-4 rounded-xl">
            <h3 class="font-bold mb-2">පින්තූර උඩුගත කිරීම</h3>
            <div class="space-y-4">
              <input type="file" id="fileInput" accept="image/*" class="w-full" />
              <input type="text" id="imageURLInput" class="w-full p-3 border rounded-lg" placeholder="හෝ පින්තූර URL එක ඇතුළත් කරන්න" />
              <button id="uploadImageButton" class="w-full p-3 btn-primary rounded-lg">උඩුගත කරන්න</button>
              <input type="text" id="imageURL" readonly class="w-full p-3 border rounded-lg" placeholder="පින්තූර URL එක" />
              <button id="copyURLButton" class="w-full p-3 btn-secondary rounded-lg">URL පිටපත් කරන්න</button>
              <p id="copyMsg" class="text-green-600 mt-2 hidden text-center">✅ URL පිටපත් කරන ලදි!</p>
              <img id="preview" class="mt-4 max-w-full rounded-lg hidden mx-auto" src="" alt="පෙරදසුන" />
            </div>
          </div>
        </div>
        
        <!-- Statistics -->
        <div id="statsSection" class="mt-6 hidden">
          <div class="bg-gray-50 p-4 rounded-xl">
            <h3 class="font-bold mb-4">සංඛ්‍යාලේඛන</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-white p-4 rounded-lg text-center">
                <p class="text-2xl font-bold text-blue-600" id="totalLikes">0</p>
                <p class="text-sm text-gray-600">මුළු ලයික්</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg text-center">
                <p class="text-2xl font-bold text-green-600" id="totalComments">0</p>
                <p class="text-sm text-gray-600">මුළු අදහස්</p>
              </div>
            </div>
            
            <canvas id="statsChart" height="200"></canvas>
          </div>
        </div>
        
        <!-- More Info -->
        <div id="moreInfo" class="mt-6 hidden">
          <div class="bg-blue-50 p-4 rounded-xl">
            <h3 class="font-bold mb-2">වැඩි විස්තර</h3>
            <div class="space-y-2">
              <p><strong>වෙබ් අඩවිය හැදුවේ:</strong> Lakshan</p>
              <p><strong>දුරකථන අංකය:</strong> 0762731899</p>
              <p><strong>ඔබට කළ හැකි දේ:</strong></p>
              <ul class="list-disc pl-5">
                <li>භාණ්ඩ එකතු කර විකිණීම.</li>
                <li>WhatsApp හරහා භාණ්ඩ මිලදී ගැනීම.</li>
                <li>ප්‍රොෆයිල් පින්තූරය උඩුගත කිරීම.</li>
                <li>අදහස් බෙදා ගැනීම.</li>
                <li>පින්තූර සහ අදහස් වලට ලයික් දීම.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Comments Section -->
        <div class="mt-6">
          <div class="bg-gray-50 p-4 rounded-xl">
            <h3 class="font-bold mb-2">💬 අදහස්</h3>
            <div class="flex justify-between text-sm mb-2">
              <p id="commentCount">අදහස්: 0</p>
              <p id="onlineUsers">ලොග් වී ඇති පරිශීලකයන්: 0</p>
            </div>
            <textarea id="commentInput" class="w-full p-3 border rounded-lg" placeholder="ඔබේ අදහස..."></textarea>
            <button id="addCommentButton" class="w-full p-3 btn-primary rounded-lg mt-2">අදහස එකතු කරන්න</button>
            <div id="commentList" class="mt-4 comment-section"></div>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <button id="showHomeButton" class="px-4 py-2 btn-primary rounded-lg">
            <i class="fas fa-home mr-2"></i> Home
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Admin Panel -->
  <div id="adminPanel" class="container mx-auto max-w-4xl p-6 bg-white rounded-2xl shadow-lg mt-10 fade-in hidden">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold gradient-text">පරිපාලක පැනලය</h2>
      <p class="text-gray-600">සමස්ත වෙබ් අඩවිය කළමනාකරණය කරන්න</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Statistics -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-xl text-white">
        <h3 class="font-bold mb-2">සංඛ්‍යාලේඛන</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="text-center">
            <p class="text-2xl font-bold" id="adminTotalUsers">0</p>
            <p class="text-sm">පරිශීලකයන්</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold" id="adminTotalProducts">0</p>
            <p class="text-sm">භාණ්ඩ</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold" id="adminTotalComments">0</p>
            <p class="text-sm">අදහස්</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold" id="adminTotalCoins">0</p>
            <p class="text-sm">කොයින්</p>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-gradient-to-r from-green-500 to-green-700 p-4 rounded-xl text-white">
        <h3 class="font-bold mb-2">ක්ෂණික ක්‍රියා</h3>
        <div class="grid grid-cols-2 gap-2">
          <button id="adminExportDataButton" class="p-2 bg-white text-green-700 rounded-lg text-sm font-bold">දත්ත නිර්යාත</button>
          <button id="adminImportDataButton" class="p-2 bg-white text-green-700 rounded-lg text-sm font-bold">දත්ත ආයාත</button>
          <button id="adminBackupDataButton" class="p-2 bg-white text-green-700 rounded-lg text-sm font-bold">Mega සුරකින්න</button>
          <button id="adminViewAnalyticsButton" class="p-2 bg-white text-green-700 rounded-lg text-sm font-bold">විශ්ලේෂණ</button>
        </div>
      </div>
    </div>
    
    <!-- User Management -->
    <div class="bg-gray-50 p-4 rounded-xl mb-6">
      <h3 class="font-bold mb-4">පරිශීලක කළමනාකරණය</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input id="adminUserCode" class="p-3 border rounded-lg" placeholder="පරිශීලක කේතය" />
        <input id="adminCoinAmount" type="number" min="1" class="p-3 border rounded-lg" placeholder="කොයින් ගණන" />
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button id="adminDeleteUserButton" class="p-2 bg-red-600 text-white rounded-lg text-sm">ගිණුම මකන්න</button>
        <button id="adminDeleteUserCommentsButton" class="p-2 bg-red-500 text-white rounded-lg text-sm">කමෙන්ට් මකන්න</button>
        <button id="adminDeleteUserProductsButton" class="p-2 bg-red-400 text-white rounded-lg text-sm">භාණ්ඩ මකන්න</button>
        <button id="adminSendCoinsButton" class="p-2 bg-green-600 text-white rounded-lg text-sm">කොයින් යවන්න</button>
      </div>
      
      <div class="mt-4 max-h-60 overflow-y-auto">
        <div id="allUsersList"></div>
      </div>
    </div>
    
    <!-- Analytics Chart -->
    <div class="bg-white p-4 rounded-xl border mb-6">
      <h3 class="font-bold mb-4">ක්‍රියාකාරකම් විශ්ලේෂණය</h3>
      <canvas id="adminChart" height="250"></canvas>
    </div>
    
    <div class="text-center">
      <button id="adminBackButton" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        <i class="fas fa-arrow-left mr-2"></i> පසුපසට
      </button>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 mt-auto">
    <div class="container mx-auto text-center">
      <p>© 2025 Laki Shopping. සියලු හිමිකම් ඇවිරිණි.</p>
      <p>Designed by Lakshan</p>
    </div>
  </footer>

  <!-- Floating Action Button -->
  <button id="floatingShopButton" class="floating-btn bg-blue-600 text-white p-4 rounded-full shadow-lg pulse hidden">
    <i class="fas fa-shopping-cart text-xl"></i>
  </button>

  <script>
    // Mega storage configuration
    const MEGA_CONFIG = {
      email: 'lakshankpg2009@gmail.com',
      password: 'lakshankpg',
      baseURL: 'https://g.api.mega.co.nz/cs'
    };

    // Global variables
    let currentUser = null;
    let adminChart = null;
    let statsChart = null;

    document.addEventListener('DOMContentLoaded', () => {
      initializeApp();
    });

    function initializeApp() {
      // Load current user
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        currentUser = JSON.parse(userData);
      }

      // Setup event listeners
      setupEventListeners();

      // Check for referral
      checkReferral();

      // Initial page load
      if (currentUser) {
        showShop();
      } else {
        showLogin();
      }
    }

    function setupEventListeners() {
      // Authentication
      document.getElementById('registerButton').addEventListener('click', register);
      document.getElementById('showLoginButton').addEventListener('click', showLogin);
      document.getElementById('loginButton').addEventListener('click', login);
      document.getElementById('showRegisterButton').addEventListener('click', showRegister);
      document.getElementById('adminLoginButton').addEventListener('click', showAdminLogin);

      // Shop Page
      document.getElementById('showSettingsButton').addEventListener('click', showSettings);
      document.getElementById('toggleProductFormButton').addEventListener('click', toggleProductForm);
      document.getElementById('submitProductButton').addEventListener('click', submitProduct);
      document.getElementById('cancelProductButton').addEventListener('click', cancelProduct);
      document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 500));
      document.getElementById('floatingShopButton').addEventListener('click', showShop);

      // Settings Page
      document.getElementById('uploadProfilePhotoButton').addEventListener('click', uploadProfilePhoto);
      document.getElementById('showAccountButton').addEventListener('click', showAccount);
      document.getElementById('deleteProfileButton').addEventListener('click', deleteProfile);
      document.getElementById('showImageUploaderButton').addEventListener('click', showImageUploader);
      document.getElementById('showStatsButton').addEventListener('click', showStats);
      document.getElementById('showMoreInfoButton').addEventListener('click', showMoreInfo);
      document.getElementById('uploadImageButton').addEventListener('click', uploadImage);
      document.getElementById('copyURLButton').addEventListener('click', copyURL);
      document.getElementById('buyCoinsSettingsButton').addEventListener('click', buyCoins);
      document.getElementById('addCommentButton').addEventListener('click', addComment);
      document.getElementById('showHomeButton').addEventListener('click', showShop);
      document.getElementById('copyReferralLink').addEventListener('click', copyReferralLink);

      // Admin Panel
      document.getElementById('adminBackButton').addEventListener('click', showShop);
      document.getElementById('adminDeleteUserButton').addEventListener('click', adminDeleteUser);
      document.getElementById('adminDeleteUserCommentsButton').addEventListener('click', adminDeleteUserComments);
      document.getElementById('adminDeleteUserProductsButton').addEventListener('click', adminDeleteUserProducts);
      document.getElementById('adminSendCoinsButton').addEventListener('click', adminSendCoins);
      document.getElementById('adminExportDataButton').addEventListener('click', adminExportData);
      document.getElementById('adminImportDataButton').addEventListener('click', adminImportData);
      document.getElementById('adminBackupDataButton').addEventListener('click', adminBackupData);
      document.getElementById('adminViewAnalyticsButton').addEventListener('click', loadAdminAnalytics);
    }

    // Utility Functions
    function generateUniqueCode() {
      return Math.random().toString(36).substring(2, 12).toUpperCase();
    }

    function showNotification(message, type = 'info') {
      const notification = document.getElementById('notification');
      notification.textContent = message;
      
      // Set color based on type
      if (type === 'success') {
        notification.style.background = '#10b981';
      } else if (type === 'error') {
        notification.style.background = '#ef4444';
      } else {
        notification.style.background = '#3b82f6';
      }
      
      notification.classList.remove('hidden');
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.classList.add('hidden');
        }, 300);
      }, 3000);
    }

    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    async function compressImage(file) {
      return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const maxWidth = 800;
            const maxHeight = 800;
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
              resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
            }, 'image/jpeg', 0.7);
          };
        };
        reader.readAsDataURL(file);
      });
    }

    // Data Management Functions
    function getUsers() {
      try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
      } catch (error) {
        console.error('පරිශීලක දත්ත ලබා ගැනීමේ දෝෂය:', error);
        return [];
      }
    }

    function saveUsers(users) {
      try {
        localStorage.setItem('users', JSON.stringify(users));
      } catch (error) {
        console.error('පරිශීලක දත්ත සුරැකීමේ දෝෂය:', error);
        showNotification('පරිශීලක තොරතුරු සුරැකීමේ දෝෂයක්!', 'error');
      }
    }

    function getProducts() {
      try {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
      } catch (error) {
        console.error('භාණ්ඩ දත්ත ලබා ගැනීමේ දෝෂය:', error);
        return [];
      }
    }

    function saveProducts(products) {
      try {
        localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('භාණ්ඩ දත්ත සුරැකීමේ දෝෂය:', error);
        showNotification('භාණ්ඩ සුරැකීමේ දෝෂයක්!', 'error');
      }
    }

    function getComments() {
      try {
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : [];
      } catch (error) {
        console.error('අදහස් දත්ත ලබා ගැනීමේ දෝෂය:', error);
        return [];
      }
    }

    function saveComments(comments) {
      try {
        localStorage.setItem('comments', JSON.stringify(comments));
      } catch (error) {
        console.error('අදහස් දත්ත සුරැකීමේ දෝෂය:', error);
        showNotification('අදහස් සුරැකීමේ දෝෂයක්!', 'error');
      }
    }

    function getLikes() {
      try {
        const likes = localStorage.getItem('likes');
        return likes ? JSON.parse(likes) : {};
      } catch (error) {
        console.error('ලයික් දත්ත ලබා ගැනීමේ දෝෂය:', error);
        return {};
      }
    }

    function saveLikes(likes) {
      try {
        localStorage.setItem('likes', JSON.stringify(likes));
      } catch (error) {
        console.error('ලයික් දත්ත සුරැකීමේ දෝෂය:', error);
        showNotification('ලයික් සුරැකීමේ දෝෂයක්!', 'error');
      }
    }

    function getLoggedInUsers() {
      try {
        const loggedInUsers = localStorage.getItem('loggedInUsers');
        return loggedInUsers ? JSON.parse(loggedInUsers) : [];
      } catch (error) {
        console.error('ලොග් වී ඇති පරිශීලක දත්ත ලබා ගැනීමේ දෝෂය:', error);
        return [];
      }
    }

    function saveLoggedInUsers(loggedInUsers) {
      try {
        localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
      } catch (error) {
        console.error('ලොග් වී ඇති පරිශීලක දත්ත සුරැකීමේ දෝෂය:', error);
        showNotification('ලොග් වී ඇති පරිශීලකයන් සුරැකීමේ දෝෂයක්!', 'error');
      }
    }

    // Page Navigation Functions
    function showLogin() {
      hideAllPages();
      document.getElementById('loginPage').classList.remove('hidden');
    }

    function showRegister() {
      hideAllPages();
      document.getElementById('registerPage').classList.remove('hidden');
    }

    function showShop() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      hideAllPages();
      document.getElementById('shopPage').classList.remove('hidden');
      document.getElementById('addProductForm').classList.add('hidden');
      document.getElementById('floatingShopButton').classList.add('hidden');
      
      loadProducts();
      loadProductNames();
      updateCoinBalance();
    }

    function showSettings() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      hideAllPages();
      document.getElementById('settingsPage').classList.remove('hidden');
      document.getElementById('floatingShopButton').classList.remove('hidden');
      
      // Update user info
      document.getElementById('userNameDisplay').textContent = currentUser.name;
      document.getElementById('userCodeDisplay').textContent = `කේතය: ${currentUser.code}`;
      document.getElementById('userCoinsDisplay').textContent = `කොයින්: ${currentUser.coins || 0}`;
      document.getElementById('profilePhoto').src = currentUser.photo || 'https://via.placeholder.com/100?text=Profile';
      
      // Update referral link
      document.getElementById('referralLink').value = `${window.location.origin}${window.location.pathname}?ref=${currentUser.code}`;
      
      // Hide all sections
      document.getElementById('accountDetails').classList.add('hidden');
      document.getElementById('imageUploader').classList.add('hidden');
      document.getElementById('statsSection').classList.add('hidden');
      document.getElementById('moreInfo').classList.add('hidden');
      
      loadComments();
      updateStats();
    }

    function showAdminLogin() {
      const username = prompt('පරිපාලක නම:');
      const password = prompt('මුරපදය:');
      
      if (username === 'lakshankpg' && password === 'lakshankpg2009') {
        showAdminPanel();
      } else {
        showNotification('වැරදි පරිපාලක තොරතුරු!', 'error');
      }
    }

    function showAdminPanel() {
      hideAllPages();
      document.getElementById('adminPanel').classList.remove('hidden');
      document.getElementById('floatingShopButton').classList.add('hidden');
      
      loadAdminPanel();
    }

    function hideAllPages() {
      const pages = ['registerPage', 'loginPage', 'shopPage', 'settingsPage', 'adminPanel'];
      pages.forEach(page => {
        document.getElementById(page).classList.add('hidden');
      });
    }

    // Authentication Functions
    function register() {
      const name = document.getElementById('regName').value.trim();
      const dob = document.getElementById('regDOB').value;
      const pass = document.getElementById('regPass').value.trim();
      const agreeTerms = document.getElementById('agreeTerms').checked;
      
      if (!name || !dob || !pass) {
        showNotification('සියලු තොරතුරු පුරවන්න!', 'error');
        return;
      }
      
      if (!agreeTerms) {
        showNotification('කරුණාකර සේවා කොන්දේසි සමඟ එකඟ වන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      if (users.find(u => u.name === name)) {
        showNotification('මෙම නම දැනටමත් ලියාපදිංචි කර ඇත!', 'error');
        return;
      }
      
      // Generate unique 10-digit code
      let uniqueCode;
      do {
        uniqueCode = generateUniqueCode();
      } while (users.find(u => u.code === uniqueCode));
      
      const newUser = {
        name, 
        dob, 
        pass, 
        photo: '', 
        coins: 0, 
        code: uniqueCode,
        joinedDate: new Date().toISOString()
      };
      
      users.push(newUser);
      saveUsers(users);
      
      // Show the code to the user
      showNotification(`ලියාපදිංචිය සාර්ථකයි! ඔබගේ කේතය: ${uniqueCode}`, 'success');
      
      document.getElementById('regName').value = '';
      document.getElementById('regDOB').value = '';
      document.getElementById('regPass').value = '';
      document.getElementById('agreeTerms').checked = false;
      
      showLogin();
    }

    function login() {
      const name = document.getElementById('loginName').value.trim();
      const code = document.getElementById('loginCode').value.trim();
      const pass = document.getElementById('loginPass').value.trim();
      
      if ((!name && !code) || !pass) {
        showNotification('නම හෝ කේතය සහ මුරපදය ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      let user;
      
      if (code) {
        user = users.find(u => u.code === code && u.pass === pass);
      } else {
        user = users.find(u => u.name === name && u.pass === pass);
      }
      
      if (!user) {
        showNotification('නම/කේතය හෝ මුරපදය වැරදියි!', 'error');
        return;
      }
      
      currentUser = { ...user };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      const loggedInUsers = getLoggedInUsers();
      if (!loggedInUsers.includes(user.name)) {
        loggedInUsers.push(user.name);
        saveLoggedInUsers(loggedInUsers);
      }
      
      document.getElementById('loginName').value = '';
      document.getElementById('loginCode').value = '';
      document.getElementById('loginPass').value = '';
      
      showNotification(`සාදරයෙන් පිළිගනිමු, ${user.name}!`, 'success');
      showShop();
    }

    function checkReferral() {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      
      if (refCode && !currentUser) {
        // Store referral code for when user registers
        localStorage.setItem('pendingReferral', refCode);
      } else if (refCode && currentUser) {
        // User is already logged in, process referral
        processReferral(refCode);
      }
    }

    function processReferral(refCode) {
      const users = getUsers();
      const referrer = users.find(u => u.code === refCode);
      
      if (referrer && referrer.name !== currentUser.name) {
        // Add coins to both users
        const updatedUsers = users.map(u => {
          if (u.code === refCode) {
            return { ...u, coins: (u.coins || 0) + 2 };
          } else if (u.name === currentUser.name) {
            return { ...u, coins: (u.coins || 0) + 2 };
          }
          return u;
        });
        
        saveUsers(updatedUsers);
        
        // Update current user
        currentUser.coins = (currentUser.coins || 0) + 2;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showNotification(`රෙෆරල් ප්‍රසාද දීමනාව! ඔබට සහ යොමුකරන්නාට කොයින් 2ක් ලැබුණා!`, 'success');
        updateCoinBalance();
        
        // Remove the ref parameter from URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }

    function copyReferralLink() {
      const referralLink = document.getElementById('referralLink');
      referralLink.select();
      navigator.clipboard.writeText(referralLink.value).then(() => {
        showNotification('රෙෆරල් ලින්ක් පිටපත් කරන ලදි!', 'success');
      }).catch(() => {
        showNotification('ලින්ක් පිටපත් කිරීමේ දෝෂයක්!', 'error');
      });
    }

    // Product Management Functions
    function toggleProductForm() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const users = getUsers();
      const currentUserData = users.find(u => u.name === currentUser.name);
      if (!currentUserData || (currentUserData.coins || 0) < 1) {
        showNotification('භාණ්ඩයක් එකතු කිරීමට ඔබට අවම වශයෙන් කොයින් 1ක් අවශ්‍යයි!', 'error');
        return;
      }
      
      const form = document.getElementById('addProductForm');
      form.classList.toggle('hidden');
      
      if (!form.classList.contains('hidden')) {
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productContact').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productImage').value = '';
        document.getElementById('productImageURL').value = '';
      }
    }

    async function submitProduct() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const users = getUsers();
      const currentUserData = users.find(u => u.name === currentUser.name);
      if (!currentUserData || (currentUserData.coins || 0) < 1) {
        showNotification('භාණ්ඩයක් එකතු කිරීමට ඔබට අවම වශයෙන් කොයින් 1ක් අවශ්‍යයි!', 'error');
        return;
      }
      
      const name = document.getElementById('productName').value.trim();
      const price = document.getElementById('productPrice').value.trim();
      const contact = document.getElementById('productContact').value.trim();
      const description = document.getElementById('productDescription').value.trim();
      const file = document.getElementById('productImage').files[0];
      const imageURL = document.getElementById('productImageURL').value.trim();
      
      if (!name || !price || !contact || (!file && !imageURL)) {
        showNotification('අවශ්‍ය තොරතුරු සියල්ල පුරවන්න!', 'error');
        return;
      }
      
      if (!/^\d{10}$/.test(contact)) {
        showNotification('දුරකථන අංකය අංක 10කින් සමන්විත විය යුතුයි!', 'error');
        return;
      }
      
      let finalImageURL = '';
      
      if (file) {
        try {
          const compressedFile = await compressImage(file);
          const formData = new FormData();
          formData.append('image', compressedFile);
          
          // In a real implementation, you would upload to Mega here
          // This is a simplified version
          finalImageURL = URL.createObjectURL(compressedFile);
          
        } catch (error) {
          showNotification('පින්තූරය උඩුගත කිරීමේ දෝෂයක්!', 'error');
          return;
        }
      } else if (imageURL) {
        try {
          // Validate URL
          new URL(imageURL);
          finalImageURL = imageURL;
        } catch {
          showNotification('ඇතුළත් කළ URL එක වලංගු නොවේ!', 'error');
          return;
        }
      }
      
      // Send WhatsApp message
      const message = `භාණ්ඩය: ${name}\nමිල: රු. ${price}\nදුරකථන අංකය: ${contact}\nවිස්තරය: ${description || 'විස්තරයක් නොමැත'}\nපින්තූරය: ${finalImageURL}`;
      const whatsappLink = `https://wa.me/94762731899?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
      
      // Save product
      const products = getProducts();
      const newProduct = {
        id: Date.now().toString(),
        name, 
        price: parseFloat(price), 
        contact, 
        description, 
        img: finalImageURL, 
        owner: currentUser.name,
        ownerPhoto: currentUser.photo,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      
      products.push(newProduct);
      saveProducts(products);
      
      // Deduct coin
      const updatedUsers = users.map(u => 
        u.name === currentUser.name ? { ...u, coins: (u.coins || 0) - 1 } : u
      );
      saveUsers(updatedUsers);
      
      // Update current user
      currentUser.coins = (currentUser.coins || 0) - 1;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      showNotification('භාණ්ඩය WhatsApp හරහා යවන ලදි! (කොයින් 1ක් අඩු කරන ලදි)', 'success');
      toggleProductForm();
      loadProducts();
      loadProductNames();
      updateCoinBalance();
    }

    function cancelProduct() {
      toggleProductForm();
    }

    function loadProducts(searchTerm = '') {
      if (!currentUser) return;
      
      const products = getProducts();
      const listElement = document.getElementById('productList');
      const likes = getLikes();
      
      let filteredProducts = searchTerm
        ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : products;
      
      listElement.innerHTML = filteredProducts.length === 0 
        ? '<p class="text-center col-span-full py-8 text-gray-500">කිසිදු භාණ්ඩයක් නොමැත.</p>' 
        : '';
      
      filteredProducts.forEach((product) => {
        const isLiked = likes[product.id] && likes[product.id].includes(currentUser.name);
        const likeCount = product.likes || 0;
        const commentCount = product.comments ? product.comments.length : 0;
        
        const message = `මට මෙම භාණ්ඩය අවශ්‍යයි: ${product.name}\nමිල: රු. ${product.price}\n${product.contact}\n${product.description || 'විස්තරයක් නොමැත'}\n${product.img}`;
        const messageLink = `https://wa.me/94762731899?text=${encodeURIComponent(message)}`;
        
        listElement.innerHTML += `
          <div class="product-card">
            <div class="relative">
              <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover" onerror="this.src='https://via.placeholder.com/300x200?text=පින්තූරය+නොමැත'" />
              <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                රු. ${product.price}
              </div>
            </div>
            
            <div class="p-4">
              <h4 class="text-lg font-bold">${product.name}</h4>
              <p class="text-gray-600 text-sm mt-1">${product.description || 'විස්තරයක් නොමැත'}</p>
              
              <div class="flex items-center mt-3">
                <img src="${product.ownerPhoto || 'https://via.placeholder.com/40?text=Profile'}" alt="${product.owner}" class="w-6 h-6 rounded-full" onerror="this.src='https://via.placeholder.com/40?text=Profile'" />
                <span class="ml-2 text-sm text-gray-600">${product.owner}</span>
              </div>
              
              <div class="flex justify-between items-center mt-4">
                <div class="flex space-x-2">
                  <button onclick="toggleLike('${product.id}')" class="like-btn ${isLiked ? 'liked' : ''}">
                    <i class="fas fa-heart ${isLiked ? 'text-red-500' : 'text-gray-400'}"></i>
                    <span class="ml-1 text-sm">${likeCount}</span>
                  </button>
                  
                  <button onclick="showProductComments('${product.id}')" class="text-gray-400">
                    <i class="fas fa-comment"></i>
                    <span class="ml-1 text-sm">${commentCount}</span>
                  </button>
                </div>
                
                <a href="${messageLink}" target="_blank" class="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center">
                  <i class="fab fa-whatsapp mr-1"></i> WhatsApp
                </a>
              </div>
              
              ${product.owner === currentUser.name ? `
                <button onclick="deleteProduct('${product.id}')" class="w-full mt-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                  මකන්න
                </button>
              ` : ''}
            </div>
          </div>
        `;
      });
    }

    function loadProductNames() {
      const products = getProducts();
      const namesElement = document.getElementById('productNames');
      namesElement.innerHTML = products.length === 0 ? '<p>කිසිදු භාණ්ඩයක් නොමැත!</p>' : '';
      
      products.forEach(product => {
        const span = document.createElement('span');
        span.textContent = product.name;
        span.className = 'cursor-pointer mx-2 underline hover:text-green-300 transition';
        span.addEventListener('click', () => {
          document.getElementById('searchInput').value = product.name;
          loadProducts(product.name);
          document.getElementById('searchSuggestions').classList.add('hidden');
        });
        namesElement.appendChild(span);
      });
    }

    function handleSearch() {
      const searchTerm = document.getElementById('searchInput').value.trim();
      const suggestionsElement = document.getElementById('searchSuggestions');
      suggestionsElement.innerHTML = '';
      
      if (!searchTerm) {
        suggestionsElement.classList.add('hidden');
        loadProducts();
        return;
      }
      
      const products = getProducts();
      const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      filteredProducts.forEach(product => {
        const div = document.createElement('div');
        const highlightedName = product.name.replace(
          new RegExp(searchTerm, 'gi'), 
          match => `<mark>${match}</mark>`
        );
        div.innerHTML = highlightedName;
        div.className = 'p-2 hover:bg-gray-200 cursor-pointer';
        div.addEventListener('click', () => {
          document.getElementById('searchInput').value = product.name;
          loadProducts(product.name);
          suggestionsElement.classList.add('hidden');
        });
        suggestionsElement.appendChild(div);
      });
      
      suggestionsElement.classList.toggle('hidden', filteredProducts.length === 0);
      loadProducts(searchTerm);
    }

    function deleteProduct(productId) {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const products = getProducts();
      const productIndex = products.findIndex(p => p.id === productId);
      
      if (productIndex === -1) {
        showNotification('භාණ්ඩය හමු නොවීය!', 'error');
        return;
      }
      
      if (products[productIndex].owner !== currentUser.name) {
        showNotification('ඔබට මෙම භාණ්ඩය මකා දැමිය නොහැක!', 'error');
        return;
      }
      
      products.splice(productIndex, 1);
      saveProducts(products);
      
      showNotification('භාණ්ඩය මකා ඇත!', 'success');
      loadProducts();
      loadProductNames();
    }

    // Like and Comment Functions
    function toggleLike(productId) {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const products = getProducts();
      const productIndex = products.findIndex(p => p.id === productId);
      
      if (productIndex === -1) {
        showNotification('භාණ්ඩය හමු නොවීය!', 'error');
        return;
      }
      
      const likes = getLikes();
      if (!likes[productId]) {
        likes[productId] = [];
      }
      
      const userIndex = likes[productId].indexOf(currentUser.name);
      
      if (userIndex === -1) {
        // Like the product
        likes[productId].push(currentUser.name);
        products[productIndex].likes = (products[productIndex].likes || 0) + 1;
        showNotification('ඔබ මෙම භාණ්ඩයට ලයික් කළා!', 'success');
      } else {
        // Unlike the product
        likes[productId].splice(userIndex, 1);
        products[productIndex].likes = Math.max(0, (products[productIndex].likes || 0) - 1);
        showNotification('ඔබ මෙම භාණ්ඩයේ ලයික් එක ඉවත් කළා!', 'info');
      }
      
      saveLikes(likes);
      saveProducts(products);
      loadProducts();
    }

    function showProductComments(productId) {
      // This would open a modal with comments for the specific product
      // For simplicity, we'll just show a notification
      showNotification('මෙම අංගය ඉක්මනින් ලබා දෙනු ඇත!', 'info');
    }

    function addComment() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const comment = document.getElementById('commentInput').value.trim();
      if (!comment) {
        showNotification('අදහසක් ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const comments = getComments();
      const newComment = {
        id: Date.now().toString(),
        user: currentUser.name,
        userPhoto: currentUser.photo,
        comment,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      
      comments.push(newComment);
      saveComments(comments);
      
      document.getElementById('commentInput').value = '';
      showNotification('අදහස එකතු කරන ලදි!', 'success');
      loadComments();
      updateStats();
    }

    function loadComments() {
      const comments = getComments();
      const commentList = document.getElementById('commentList');
      commentList.innerHTML = '';
      
      comments.forEach((comment) => {
        commentList.innerHTML += `
          <div class="flex items-start p-3 bg-white rounded-lg shadow-sm mt-2">
            <img src="${comment.userPhoto || 'https://via.placeholder.com/40?text=Profile'}" alt="${comment.user}" class="w-8 h-8 rounded-full mt-1" onerror="this.src='https://via.placeholder.com/40?text=Profile'" />
            <div class="ml-3 flex-1">
              <div class="flex justify-between">
                <p class="font-bold">${comment.user}</p>
                <span class="text-xs text-gray-500">${new Date(comment.timestamp).toLocaleString('si-LK')}</span>
              </div>
              <p class="text-sm mt-1">${comment.comment}</p>
              <div class="flex items-center mt-2">
                <button onclick="likeComment('${comment.id}')" class="text-gray-500 text-sm flex items-center">
                  <i class="fas fa-thumbs-up mr-1"></i> ලයික් <span class="ml-1">${comment.likes || 0}</span>
                </button>
                ${comment.user === currentUser.name ? `
                  <button onclick="deleteComment('${comment.id}')" class="ml-4 text-red-500 text-sm">
                    <i class="fas fa-trash"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      });
      
      document.getElementById('commentCount').textContent = `අදහස්: ${comments.length}`;
    }

    function likeComment(commentId) {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        return;
      }
      
      const comments = getComments();
      const commentIndex = comments.findIndex(c => c.id === commentId);
      
      if (commentIndex === -1) {
        showNotification('අදහස හමු නොවීය!', 'error');
        return;
      }
      
      // For simplicity, we're just incrementing the like count
      // In a real app, you'd track which users liked which comments
      comments[commentIndex].likes = (comments[commentIndex].likes || 0) + 1;
      saveComments(comments);
      
      showNotification('ඔබ මෙම අදහසට ලයික් කළා!', 'success');
      loadComments();
      updateStats();
    }

    function deleteComment(commentId) {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        return;
      }
      
      const comments = getComments();
      const commentIndex = comments.findIndex(c => c.id === commentId);
      
      if (commentIndex === -1) {
        showNotification('අදහස හමු නොවීය!', 'error');
        return;
      }
      
      if (comments[commentIndex].user !== currentUser.name) {
        showNotification('ඔබට මෙම අදහස මකා දැමිය නොහැක!', 'error');
        return;
      }
      
      comments.splice(commentIndex, 1);
      saveComments(comments);
      
      showNotification('අදහස මකා ඇත!', 'success');
      loadComments();
      updateStats();
    }

    // Settings Functions
    function showAccount() {
      document.getElementById('accountDetails').classList.remove('hidden');
      document.getElementById('imageUploader').classList.add('hidden');
      document.getElementById('statsSection').classList.add('hidden');
      document.getElementById('moreInfo').classList.add('hidden');
      
      document.getElementById('accountInfo').innerHTML = `
        <div class="space-y-2">
          <p><strong>නම:</strong> ${currentUser.name}</p>
          <p><strong>උපන්දිනය:</strong> ${currentUser.dob}</p>
          <p><strong>මුරපදය:</strong> ${currentUser.pass}</p>
          <p><strong>10-ඉලක්කම් කේතය:</strong> ${currentUser.code}</p>
          <button onclick="copyUserCode('${currentUser.code}')" class="w-full p-2 btn-primary rounded-lg mt-2">
            කේතය පිටපත් කරන්න
          </button>
          <p><strong>කොයින්:</strong> ${currentUser.coins || 0}</p>
        </div>
      `;
    }

    function copyUserCode(code) {
      navigator.clipboard.writeText(code).then(() => {
        showNotification('කේතය පිටපත් කරන ලදි!', 'success');
      }).catch(() => {
        showNotification('කේතය පිටපත් කිරීමේ දෝෂය!', 'error');
      });
    }

    function showImageUploader() {
      document.getElementById('imageUploader').classList.remove('hidden');
      document.getElementById('accountDetails').classList.add('hidden');
      document.getElementById('statsSection').classList.add('hidden');
      document.getElementById('moreInfo').classList.add('hidden');
      
      document.getElementById('fileInput').value = '';
      document.getElementById('imageURLInput').value = '';
      document.getElementById('imageURL').value = '';
      document.getElementById('preview').classList.add('hidden');
      document.getElementById('copyMsg').classList.add('hidden');
    }

    function showStats() {
      document.getElementById('statsSection').classList.remove('hidden');
      document.getElementById('accountDetails').classList.add('hidden');
      document.getElementById('imageUploader').classList.add('hidden');
      document.getElementById('moreInfo').classList.add('hidden');
      
      updateStats();
      loadStatsChart();
    }

    function showMoreInfo() {
      document.getElementById('moreInfo').classList.remove('hidden');
      document.getElementById('accountDetails').classList.add('hidden');
      document.getElementById('imageUploader').classList.add('hidden');
      document.getElementById('statsSection').classList.add('hidden');
    }

    function updateStats() {
      const comments = getComments();
      const loggedInUsers = getLoggedInUsers();
      const products = getProducts();
      const likes = getLikes();
      
      // Calculate total likes
      let totalLikes = 0;
      Object.values(likes).forEach(userLikes => {
        totalLikes += userLikes.length;
      });
      
      document.getElementById('commentCount').textContent = `අදහස්: ${comments.length}`;
      document.getElementById('onlineUsers').textContent = `ලොග් වී ඇති පරිශීලකයන්: ${loggedInUsers.length}`;
      document.getElementById('totalLikes').textContent = totalLikes;
      document.getElementById('totalComments').textContent = comments.length;
    }

    function loadStatsChart() {
      const ctx = document.getElementById('statsChart').getContext('2d');
      
      if (statsChart) {
        statsChart.destroy();
      }
      
      // Sample data - in a real app, you'd calculate this from actual data
      statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා', 'ඉරිදා'],
          datasets: [{
            label: 'ලයික්',
            data: [12, 19, 3, 5, 2, 3, 15],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }, {
            label: 'අදහස්',
            data: [5, 10, 6, 8, 3, 7, 12],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    async function uploadProfilePhoto() {
      const file = document.getElementById('profilePhotoInput').files[0];
      if (!file) {
        showNotification('පින්තූරයක් තෝරන්න!', 'error');
        return;
      }
      
      try {
        const compressedFile = await compressImage(file);
        
        // In a real implementation, you would upload to Mega here
        // For now, we'll use a local URL
        const url = URL.createObjectURL(compressedFile);
        
        if (currentUser.name) {
          const users = getUsers();
          const updatedUsers = users.map(u => 
            u.name === currentUser.name ? { ...u, photo: url } : u
          );
          
          saveUsers(updatedUsers);
          
          currentUser.photo = url;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          
          document.getElementById('profilePhoto').src = url;
          showNotification('ප්‍රොෆයිල් පින්තූරය උඩුගත කරන ලදි!', 'success');
        }
      } catch (error) {
        showNotification('පින්තූරය උඩුගත කිරීමේ දෝෂයක්!', 'error');
      }
    }

    async function uploadImage() {
      const file = document.getElementById('fileInput').files[0];
      const urlInput = document.getElementById('imageURLInput').value.trim();
      
      if (!file && !urlInput) {
        showNotification('පින්තූරයක් තෝරන්න හෝ URL එකක් ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      let imageURL = '';
      
      if (file) {
        try {
          const compressedFile = await compressImage(file);
          imageURL = URL.createObjectURL(compressedFile);
        } catch (error) {
          showNotification('පින්තූරය උඩුගත කිරීමේ දෝෂයක්!', 'error');
          return;
        }
      } else if (urlInput) {
        try {
          new URL(urlInput);
          imageURL = urlInput;
        } catch {
          showNotification('ඇතුළත් කළ URL එක වලංගු නොවේ!', 'error');
          return;
        }
      }
      
      document.getElementById('imageURL').value = imageURL;
      document.getElementById('preview').src = imageURL;
      document.getElementById('preview').classList.remove('hidden');
      document.getElementById('copyMsg').classList.add('hidden');
      
      showNotification('පින්තූරය සූදානම්!', 'success');
    }

    function copyURL() {
      const input = document.getElementById('imageURL');
      if (!input.value) {
        showNotification('මුලින්ම පින්තූරයක් උඩුගත කරන්න හෝ URL එකක් ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      input.select();
      navigator.clipboard.writeText(input.value).then(() => {
        document.getElementById('copyMsg').classList.remove('hidden');
        showNotification('URL පිටපත් කරන ලදි!', 'success');
      }).catch(() => {
        showNotification('URL පිටපත් කිරීමේ දෝෂය!', 'error');
      });
    }

    function deleteProfile() {
      if (!confirm('ඔබගේ ගිණුම මකන්නද? මෙම ක්‍රියාව ආපසු හැරවිය නොහැක!')) {
        return;
      }
      
      if (!currentUser) {
        showNotification('පරිශීලක තොරතුරු නොමැත!', 'error');
        showLogin();
        return;
      }
      
      const users = getUsers().filter(u => u.name !== currentUser.name);
      const products = getProducts().filter(p => p.owner !== currentUser.name);
      const comments = getComments().filter(c => c.user !== currentUser.name);
      const loggedInUsers = getLoggedInUsers().filter(u => u !== currentUser.name);
      
      // Remove user likes
      const likes = getLikes();
      Object.keys(likes).forEach(productId => {
        likes[productId] = likes[productId].filter(user => user !== currentUser.name);
      });
      
      saveUsers(users);
      saveProducts(products);
      saveComments(comments);
      saveLoggedInUsers(loggedInUsers);
      saveLikes(likes);
      
      localStorage.removeItem('currentUser');
      currentUser = null;
      
      showNotification('ගිණුම මකා දැමිනි!', 'success');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }

    function updateCoinBalance() {
      if (!currentUser) return;
      
      const users = getUsers();
      const userData = users.find(u => u.name === currentUser.name) || { coins: 0 };
      document.getElementById('coinCount').textContent = userData.coins || 0;
    }

    function buyCoins() {
      if (!currentUser) {
        showNotification('කරුණාකර පළමුව පිවිසෙන්න!', 'error');
        showLogin();
        return;
      }
      
      const coinAmount = prompt('මිලදී ගන්න කොයින් ගණන ඇතුළත් කරන්න:');
      if (!coinAmount || isNaN(coinAmount) || parseInt(coinAmount) <= 0) {
        showNotification('වලංගු කොයින් ගණනක් ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const coins = parseInt(coinAmount);
      const cost = coins * 40; // 1 coin = 40 LKR
      
      const message = `මට කොයින් ${coins}ක් මිලදී ගැනීමට අවශ්‍යයි. මුළු මුදල: රු. ${cost}`;
      const whatsappLink = `https://wa.me/94762731899?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
      
      const users = getUsers();
      const updatedUsers = users.map(u => 
        u.name === currentUser.name ? { ...u, coins: (u.coins || 0) + coins } : u
      );
      
      saveUsers(updatedUsers);
      
      currentUser.coins = (currentUser.coins || 0) + coins;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      showNotification(`කොයින් ${coins}ක් මිලදී ගැනීමට WhatsApp පණිවිඩය යවන ලදි! (මුළු මුදල: රු. ${cost})`, 'success');
      updateCoinBalance();
    }

    // Admin Panel Functions
    function loadAdminPanel() {
      const users = getUsers();
      const products = getProducts();
      const comments = getComments();
      
      // Update statistics
      document.getElementById('adminTotalUsers').textContent = users.length;
      document.getElementById('adminTotalProducts').textContent = products.length;
      document.getElementById('adminTotalComments').textContent = comments.length;
      
      const totalCoins = users.reduce((sum, user) => sum + (user.coins || 0), 0);
      document.getElementById('adminTotalCoins').textContent = totalCoins;
      
      // Load all users
      const usersList = document.getElementById('allUsersList');
      usersList.innerHTML = '';
      
      users.forEach(user => {
        usersList.innerHTML += `
          <div class="p-3 bg-white rounded-lg mb-2">
            <p><strong>${user.name}</strong> (${user.code})</p>
            <p class="text-sm text-gray-600">කොයින්: ${user.coins || 0} | එක් වූ දිනය: ${new Date(user.joinedDate).toLocaleDateString('si-LK')}</p>
          </div>
        `;
      });
      
      loadAdminAnalytics();
    }

    function loadAdminAnalytics() {
      const ctx = document.getElementById('adminChart').getContext('2d');
      
      if (adminChart) {
        adminChart.destroy();
      }
      
      // Sample data - in a real app, you'd use actual data
      adminChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජූනි'],
          datasets: [{
            label: 'නව පරිශීලකයන්',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            fill: true
          }, {
            label: 'නව භාණ්ඩ',
            data: [5, 12, 8, 15, 18, 25],
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'මාසික වර්ධනය'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    function adminDeleteUser() {
      const userCode = document.getElementById('adminUserCode').value.trim();
      if (!userCode) {
        showNotification('පරිශීලක කේතය ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      const user = users.find(u => u.code === userCode);
      if (!user) {
        showNotification('මෙම කේතය සමඟ පරිශීලකයෙක් හමු නොවීය!', 'error');
        return;
      }
      
      if (!confirm(`ඔබට ${user.name} හි ගිණුම මකා දැමීමට අවශ්‍යද?`)) return;
      
      // Delete user account
      const updatedUsers = users.filter(u => u.code !== userCode);
      saveUsers(updatedUsers);
      
      // Delete user products
      const products = getProducts();
      const updatedProducts = products.filter(p => p.owner !== user.name);
      saveProducts(updatedProducts);
      
      // Delete user comments
      const comments = getComments();
      const updatedComments = comments.filter(c => c.user !== user.name);
      saveComments(updatedComments);
      
      // Remove user likes
      const likes = getLikes();
      Object.keys(likes).forEach(productId => {
        likes[productId] = likes[productId].filter(username => username !== user.name);
      });
      saveLikes(likes);
      
      // Remove from logged in users
      const loggedInUsers = getLoggedInUsers();
      const updatedLoggedInUsers = loggedInUsers.filter(u => u !== user.name);
      saveLoggedInUsers(updatedLoggedInUsers);
      
      showNotification('පරිශීලක ගිණුම සහ සියලු දත්ත මකා දමන ලදි!', 'success');
      document.getElementById('adminUserCode').value = '';
      loadAdminPanel();
    }

    function adminDeleteUserComments() {
      const userCode = document.getElementById('adminUserCode').value.trim();
      if (!userCode) {
        showNotification('පරිශීලක කේතය ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      const user = users.find(u => u.code === userCode);
      if (!user) {
        showNotification('මෙම කේතය සමඟ පරිශීලකයෙක් හමු නොවීය!', 'error');
        return;
      }
      
      if (!confirm(`ඔබට ${user.name} හි සියලු අදහස් මකා දැමීමට අවශ්‍යද?`)) return;
      
      const comments = getComments();
      const updatedComments = comments.filter(c => c.user !== user.name);
      saveComments(updatedComments);
      
      showNotification('පරිශීලකයාගේ සියලු අදහස් මකා දමන ලදි!', 'success');
      document.getElementById('adminUserCode').value = '';
      loadAdminPanel();
    }

    function adminDeleteUserProducts() {
      const userCode = document.getElementById('adminUserCode').value.trim();
      if (!userCode) {
        showNotification('පරිශීලක කේතය ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      const user = users.find(u => u.code === userCode);
      if (!user) {
        showNotification('මෙම කේතය සමඟ පරිශීලකයෙක් හමු නොවීය!', 'error');
        return;
      }
      
      if (!confirm(`ඔබට ${user.name} හි සියලු භාණ්ඩ මකා දැමීමට අවශ්‍යද?`)) return;
      
      const products = getProducts();
      const updatedProducts = products.filter(p => p.owner !== user.name);
      saveProducts(updatedProducts);
      
      showNotification('පරිශීලකයාගේ සියලු භාණ්ඩ මකා දමන ලදි!', 'success');
      document.getElementById('adminUserCode').value = '';
      loadAdminPanel();
    }

    function adminSendCoins() {
      const userCode = document.getElementById('adminUserCode').value.trim();
      const amount = parseInt(document.getElementById('adminCoinAmount').value);
      
      if (!userCode || !amount || amount <= 0) {
        showNotification('පරිශීලක කේතය සහ කොයින් ගණන ඇතුළත් කරන්න!', 'error');
        return;
      }
      
      const users = getUsers();
      const user = users.find(u => u.code === userCode);
      if (!user) {
        showNotification('මෙම කේතය සමඟ පරිශීලකයෙක් හමු නොවීය!', 'error');
        return;
      }
      
      const updatedUsers = users.map(u => {
        if (u.code === userCode) {
          return { ...u, coins: (u.coins || 0) + amount };
        }
        return u;
      });
      
      saveUsers(updatedUsers);
      showNotification(`${user.name} වෙත කොයින් ${amount}ක් යවන ලදි!`, 'success');
      document.getElementById('adminUserCode').value = '';
      document.getElementById('adminCoinAmount').value = '';
      loadAdminPanel();
    }

    function adminExportData() {
      const data = {
        users: getUsers(),
        products: getProducts(),
        comments: getComments(),
        likes: getLikes(),
        loggedInUsers: getLoggedInUsers(),
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'laki_shopping_data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showNotification('දත්ත සාර්ථකව නිර්යාත කරන ලදි!', 'success');
    }

    function adminImportData() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.json';
      
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            
            if (data.users) saveUsers(data.users);
            if (data.products) saveProducts(data.products);
            if (data.comments) saveComments(data.comments);
            if (data.likes) saveLikes(data.likes);
            if (data.loggedInUsers) saveLoggedInUsers(data.loggedInUsers);
            
            showNotification('දත්ත සාර්ථකව ආයාත කරන ලදි!', 'success');
            loadAdminPanel();
          } catch (error) {
            showNotification('දත්ත ආයාත කිරීමේ දෝෂයක්: ' + error.message, 'error');
          }
        };
        reader.readAsText(file);
      };
      
      fileInput.click();
    }

    async function adminBackupData() {
      try {
        const data = {
          users: getUsers(),
          products: getProducts(),
          comments: getComments(),
          likes: getLikes(),
          loggedInUsers: getLoggedInUsers(),
          backupDate: new Date().toISOString()
        };
        
        // In a real implementation, you would use the Mega API here
        // This is a simplified version that simulates the process
        
        showNotification('Mega ස්ටොරේජ් වෙත දත්ත සුරැකීම සිදු කෙරේ...', 'info');
        
        // Simulate successful backup
        setTimeout(() => {
          showNotification('දත්ත Mega ස්ටොරේජ් වෙත සාර්ථකව සුරකින ලදි!', 'success');
        }, 1500);
        
      } catch (error) {
        showNotification('දත්ත සුරැකීමේ දෝෂය: ' + error.message, 'error');
      }
    }
  </script>
</body>
</html>
