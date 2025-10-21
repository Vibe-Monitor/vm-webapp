/**
 * Frontend code implementation matching your requirements
 * This is the exact implementation of the checkGitHubStatus function you provided
 */

export const checkGitHubStatus = async (workspaceId: string, token: string) => {
  const response = await fetch(`/api/v1/github/status?workspace_id=${workspaceId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const data = await response.json();
  
  if (data.connected) {
    if (data.integration.is_active === false) {
      // 🚨 SUSPENDED!
      showSuspendedMessage();
    } else {
      // ✅ Active and working
      showActiveStatus();
    }
  } else {
    // Not connected at all
    showNotConnectedMessage();
  }
};

function showSuspendedMessage() {
  console.log('🚨 GitHub Integration is SUSPENDED!');
  // Your UI logic here - show suspended state
}

function showActiveStatus() {
  console.log('✅ GitHub Integration is Active and Working');
  // Your UI logic here - show active state  
}

function showNotConnectedMessage() {
  console.log('❌ GitHub is Not Connected');
  // Your UI logic here - show not connected state
}

/**
 * Example API Response for SUSPENDED state:
 * {
 *   "connected": true,
 *   "integration": {
 *     "id": "123",
 *     "github_username": "user",
 *     "installation_id": "456", 
 *     "is_active": false,  // ← KEY FIELD
 *     "last_synced_at": "2025-10-09T10:00:00Z"
 *   }
 * }
 */