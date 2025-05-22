import {TaskStatus} from '../types/taskStatus';

export const getStatusColor = (status: TaskStatus) => {
  const colors = {
    Progress: '#FFC107',
    Completed: '#28A745',
    Cancelled: '#DC3545',
  };
  return colors[status] || '#6C757D';
};

export const formatDate = (dateString: string) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('en-EN', options);
};
