export const truncateText = (text, maxLength) => {
  if (!text) return 'No description available';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};