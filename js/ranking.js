// Ranking System - localStorage + JSON API for world ranking
const Ranking = {
  STORAGE_KEY: 'animalTowerRankings',
  NAME_KEY: 'animalTowerName',
  API_URL: null, // Set this to enable world ranking backend

  getPlayerName: function() {
    return localStorage.getItem(this.NAME_KEY) || '';
  },

  setPlayerName: function(name) {
    localStorage.setItem(this.NAME_KEY, name);
  },

  hasName: function() {
    return !!this.getPlayerName();
  },

  // Get local rankings
  getLocalRankings: function() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  },

  // Save score (only if better than existing)
  saveScore: function(name, score) {
    let rankings = this.getLocalRankings();

    // Find existing entry for this player
    const existing = rankings.find(r => r.name === name);
    if (existing) {
      if (score > existing.score) {
        existing.score = score;
        existing.date = Date.now();
      } else {
        return; // No update needed
      }
    } else {
      rankings.push({ name: name, score: score, date: Date.now() });
    }

    // Sort by score descending
    rankings.sort((a, b) => b.score - a.score);

    // Keep top 100
    rankings = rankings.slice(0, 100);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rankings));
  },

  // Get rankings for display
  getRankings: function() {
    return this.getLocalRankings();
  },

  // Render ranking list HTML
  renderRankingList: function(container) {
    const rankings = this.getRankings();
    const myName = this.getPlayerName();

    if (rankings.length === 0) {
      container.innerHTML = '<div style="color:#888;text-align:center;padding:30px;">まだランキングがありません</div>';
      return;
    }

    let html = '';
    rankings.forEach((r, i) => {
      const rank = i + 1;
      const isMe = r.name === myName;
      const rankClass = rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : '';
      const medal = rank === 1 ? '👑' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

      html += '<div class="ranking-item' + (isMe ? ' me' : '') + '">';
      html += '<span class="rank-num ' + rankClass + '">' + (medal || rank) + '</span>';
      html += '<span class="rank-name">' + escapeHtml(r.name) + '</span>';
      html += '<span class="rank-score">' + r.score + '人</span>';
      html += '</div>';
    });

    container.innerHTML = html;
  }
};

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
