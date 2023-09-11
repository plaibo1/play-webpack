import styles from "./List.module.scss";

const data = [
  { id: 2, text: "somee item" },
  { id: 22, text: "somee dwad wadaw item" },
  { id: 12, text: "somee item21" },
  { id: 232, text: "somee item2112" },
  { id: 2132, text: "somee22121 item" },
];

export const List = () => {
  return (
    <div>
      <div>List</div>

      <ul className={styles.list}>
        {data.map((item) => {
          return <li>{item.text}</li>;
        })}
      </ul>
    </div>
  );
};
