function FormRow({ label, error, children }) {
  return (
    <div className="grid items-center lg:grid-cols-form-row gap-8 py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b-[1px] border-solid border-gray-100">
      {label && (
        <label className="font-medium" htmlFor={children.props?.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-base text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
