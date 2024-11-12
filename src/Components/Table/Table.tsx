import styles from "./Table.module.css";

const Table = ({ data, keys }: { data: any[]; keys: string[] }) => {
  return (
    <div className={styles.mainContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {keys.map((key) => {
              return <th>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => {
                return <td>{item[key]}</td>;
              })}
              <td className={styles.actions}>
                <button className={styles.shareButton}>Compartir</button>
                <button className={styles.detailsButton}>Ver Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
