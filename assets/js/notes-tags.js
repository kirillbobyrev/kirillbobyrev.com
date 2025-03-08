/**
 * Notes tag filtering functionality
 * Handles filtering notes by tags and related UI interactions
 */
document.addEventListener('DOMContentLoaded', function() {
  const tagFilters = document.querySelectorAll('.tag-filter');
  const noteCards = document.querySelectorAll('.note-card');
  const noteTags = document.querySelectorAll('.note-tag');

  /**
   * Filter notes based on selected tag
   * @param {string} tag - The tag to filter by
   */
  function filterNotes(tag) {
    noteCards.forEach(card => {
      if (tag === 'all') {
        card.style.display = 'block';
      } else {
        const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        if (cardTags.includes(tag)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  }

  // Tag filter button click handler
  tagFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const tag = this.dataset.tag;

      // Update active state
      tagFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');

      // Filter notes
      filterNotes(tag);
    });
  });

  // Note tag click handler
  noteTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const tagValue = this.dataset.tag;

      // Find the corresponding filter button and trigger a click
      const tagFilter = document.querySelector(`.tag-filter[data-tag="${tagValue}"]`);
      if (tagFilter) {
        tagFilter.click();

        // Scroll to top of notes
        window.scrollTo({
          top: document.querySelector('.notes-title').offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
