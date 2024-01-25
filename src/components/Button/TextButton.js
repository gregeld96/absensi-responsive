
function TextButton({ title, onClick, disable, bgColor }) {
  return (
    <button disabled={disable} onClick={onClick} className={`${disable ? 'bg-slate-500 cursor-not-allowed' : bgColor ? bgColor : 'bg-[#07638d]'} w-full min-h-[45px] lg:w-full font-bold p-2 rounded text-center text-white`}>
      <p className="text-[12px]">{title}</p>
    </button>
  );
}
  
export default TextButton;
  