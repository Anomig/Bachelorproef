type NotificationRecord = {
  id: string
  title: string
  timestamp: string
}

const notifications: NotificationRecord[] = [
  { id: 'new-scenario', title: 'Nieuw scenario aangemaakt: Online gesprek loopt vast', timestamp: '31/05/2026, 16:44' },
  { id: 'updated-scenario', title: 'Scenario bijgewerkt: Situatie op een feestje', timestamp: '31/05/2026, 16:22' }
]

export default {
  async listNotifications() {
    // Future Strapi connection point: replace this mock list with the admin notifications endpoint.
    return notifications
  },

  async clearNotifications() {
    // Future Strapi connection point: clear or mark notifications as read on the server.
    notifications.splice(0, notifications.length)
    return notifications
  },

  async dismissNotification(id: string) {
    const index = notifications.findIndex((item) => item.id === id)
    if (index !== -1) {
      notifications.splice(index, 1)
    }
    return notifications
  }
}