import { useState } from 'react'
import styles from './Support.module.css'

export default function Support() {
  const [activeTab, setActiveTab] = useState('solicitudes')

  const tickets = [
    { date: '26 Ene 2024', time: '11:31 am', id: '#12548796', title: 'No puedo calificar mi ecografía', status: 'Abierta' },
    { date: '26 Ene 2024', time: '9:40 pm', id: '#11548796', title: 'Mi ecografía salió borrosa', status: 'Abierta' },
    { date: '15 Dic 2023', time: '2:06 pm', id: '#11448796', title: 'El link de compartir no funciona', status: 'Resuelta' },
    { date: '05 Dic 2023', time: '4:21 pm', id: '#10548796', title: 'No puedo cerrar sesión', status: 'Resuelta' },
  ]

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span role="img" aria-label="Estetoscopio">🩺</span>
          Eco4D
        </div>
        <nav>
          <a href="#" className={styles.navItem}>
            <span role="img" aria-label="Carpeta">📁</span>
            Mis Ecografías
          </a>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <span role="img" aria-label="Signo de interrogación">❓</span>
            Soporte
          </a>
          <a href="#" className={styles.navItem}>
            <span role="img" aria-label="Engranaje">⚙️</span>
            Ajustes
          </a>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.header}>En Qué Podemos Ayudarte?</h1>

        <div className={styles.tabs}>
          <span 
            className={`${styles.tab} ${activeTab === 'enviar' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('enviar')}
          >
            Enviar Solicitud
          </span>
          <span 
            className={`${styles.tab} ${activeTab === 'solicitudes' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('solicitudes')}
          >
            Mis Solicitudes
          </span>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Fecha</th>
              <th className={styles.tableHeader}>Hora de envío</th>
              <th className={styles.tableHeader}>ID De Solicitud</th>
              <th className={styles.tableHeader}>Título</th>
              <th className={styles.tableHeader}>Estado</th>
              <th className={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{ticket.date}</td>
                <td className={styles.tableCell}>{ticket.time}</td>
                <td className={styles.tableCell}>{ticket.id}</td>
                <td className={styles.tableCell}>{ticket.title}</td>
                <td className={styles.tableCell}>
                  <span className={ticket.status === 'Abierta' ? styles.statusOpen : styles.statusResolved}>
                    {ticket.status}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <button className={styles.viewButton}>Ver Solicitud</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button className={styles.navButton} disabled>← Anterior</button>
          <button className={`${styles.pageButton} ${styles.active}`}>1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
          <button className={styles.pageButton}>4</button>
          <button className={styles.navButton}>Siguiente →</button>
        </div>
      </main>
    </div>
  )
}