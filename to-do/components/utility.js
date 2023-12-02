export function getAbsoluteDate(dateString) {
  const options = { year: '2-digit', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}
export function getRelativeTime(dateString) {
    const date = new Date(dateString)
    const now = new Date();
    const diffInMillis = Math.abs(now - date);
  
    const units = [
      { label: 'y', milliseconds: 365 * 24 * 60 * 60 * 1000 },
      { label: 'mo', milliseconds: 30 * 24 * 60 * 60 * 1000 },
      { label: 'd', milliseconds: 24 * 60 * 60 * 1000 },
      { label: 'h', milliseconds: 60 * 60 * 1000 },
      { label: 'm', milliseconds: 60 * 1000 },
      { label: 's', milliseconds: 1000 },
    ];
  
    if (diffInMillis > units[0].milliseconds) {
      return getAbsoluteDate(dateString)
    }
  
    let remainingMillis = diffInMillis;
    let result = '';

    for (const unit of units) {
        const unitDiff = Math.floor(remainingMillis / unit.milliseconds);
        if (unitDiff >= 1) {
             result += `${unitDiff}${unit.label} `;
            remainingMillis =remainingMillis% unit.milliseconds;
        }

        if (result.trim().split(' ').length === 2) {
        break;
        }
    }
  
    return result.trim() || 'Just now';
  }