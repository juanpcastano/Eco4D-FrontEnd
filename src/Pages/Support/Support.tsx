import { useState } from 'react'
import styles from './Support.module.css'

export default function Support() {
  const [activeTab, setActiveTab] = useState('enviar')

  const faqs = [
    '¿Por qué no puedo reproducir el video de mi ecografía?',
    '¿Por qué la ecografía que me tomé hoy no ha llegado?',
    '¿Como descargo mi diagnóstico?',
    '¿El diagnóstico que compartí será visible para siempre?'
  ]

  return (
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
          className={`${styles.tab} ${activeTab === 'mis' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('mis')}
        >
          Mis Solicitudes
        </span>
      </div>

      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Preguntas Frecuentes</h2>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <span className={styles.faqIcon}>▶</span>
            {faq}
          </div>
        ))}
      </section>

      <form className={styles.form}>
        <h2 className={styles.formTitle}>Envíanos Una Solicitud</h2>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título de la solicitud</label>
            <input type="text" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha en la que tuviste el problema</label>
            <input type="date" className={styles.input} defaultValue="2024-02-02" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo de situación</label>
            <select className={styles.select} defaultValue="fallas">
              <option value="fallas">Fallas técnicas</option>
              <option value="consulta">Consulta general</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción</label>
          <textarea 
            className={styles.textarea}
            placeholder="Describe brevemente tu situación y como podemos ayudarte"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Enviar Solicitud
        </button>
      </form>
    </main>
  )
}