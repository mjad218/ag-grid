import { MouseEventHandler } from "react";

const ActionsCell = (props: any) => {
  const id = props.data.id;
  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.handleDelete(id);
  };

  const onDuplicate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.handleDuplicate(props.data);
  };

  return (
    <>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onDuplicate}>Duplicate</button>
    </>
  );
};

export default ActionsCell;
