const Note = ({ number, title, content }) => {
  return (
    <div className="text-sm p-4 mb-2">
      <span className="text-sm text-neutral-600 absolute -left-6 top-4">
        {number}.
      </span>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-neutral-600">{content}</p>
    </div>
  );
};

export default Note;
