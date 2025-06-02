const Folder = ({
  name,
  id,
  handleClick,
  handleNewFolder,
  deleteNodeFromList,
  isOpen,
}) => {
  return (
    <div
      className={isOpen ? "folder open" : "folder"}
      onClick={() => handleClick(id)}
    >
      <span>
        <svg
          className={isOpen ? "rotate-icon" : ""}
          viewBox="0 0 1024 1024"
          version="1.1"
        >
          <path
            d="M682.666667 533.333333a21.333333 21.333333 0 0 1-15.146667-6.186666l-298.666667-298.666667a21.333333 21.333333 0 0 1 30.293334-30.293333l298.666666 298.666666a21.333333 21.333333 0 0 1 0 30.293334A21.333333 21.333333 0 0 1 682.666667 533.333333z"
            fill="#333333"
          />
          <path
            d="M384 832a21.333333 21.333333 0 0 1-15.146667-6.186667 21.333333 21.333333 0 0 1 0-30.293333l298.666667-298.666667a21.333333 21.333333 0 0 1 30.293333 30.293334l-298.666666 298.666666A21.333333 21.333333 0 0 1 384 832z"
            fill="#333333"
          />
        </svg>
        📁 {name}
      </span>
      <div>
        <button onClick={(e) => handleNewFolder(e, true, id)}>
          <svg
            fill="#000000"
            version="1.1"
            id="Ebene_1"
            width="800px"
            height="800px"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
            xmlSpace="preserve"
          >
            <g>
              <path d="M62,14H30.829l-7.415-7.414C23.039,6.211,22.53,6,22,6H2C0.896,6,0,6.896,0,8v44c0,1.104,0.896,2,2,2h60   c1.104,0,2-0.896,2-2V16C64,14.896,63.104,14,62,14z M60,50H4V10h17.171l7.415,7.414C28.961,17.789,29.47,18,30,18h30V50z" />
              <path d="M30,32h-8c-1.104,0-2,0.896-2,2s0.896,2,2,2h8v8c0,1.104,0.896,2,2,2s2-0.896,2-2v-8h8c1.104,0,2-0.896,2-2s-0.896-2-2-2   h-8v-8c0-1.104-0.896-2-2-2s-2,0.896-2,2V32z" />
            </g>
          </svg>
        </button>
        <button onClick={(e) => handleNewFolder(e, false, id)}>
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 64 64"
            strokeWidth="3"
            stroke="#000000"
            fill="none"
          >
            <polyline points="34.48 54.28 11.06 54.28 11.06 18.61 23.02 5.75 48.67 5.75 48.67 39.42"></polyline>
            <polyline points="23.04 5.75 23.02 18.61 11.06 18.61"></polyline>
            <line x1="16.21" y1="45.68" x2="28.22" y2="45.68"></line>
            <line x1="16.21" y1="39.15" x2="31.22" y2="39.15"></line>
            <line x1="16.21" y1="33.05" x2="43.22" y2="33.05"></line>
            <line x1="16.21" y1="26.95" x2="43.22" y2="26.95"></line>
            <circle
              cx="42.92"
              cy="48.24"
              r="10.01"
              strokeLinecap="round"
            ></circle>
            <line x1="42.92" y1="42.76" x2="42.92" y2="53.72"></line>
            <line x1="37.45" y1="48.24" x2="48.4" y2="48.24"></line>
          </svg>
        </button>
        <button onClick={() => deleteNodeFromList(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Folder;
