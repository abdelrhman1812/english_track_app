const VoiceSelector = ({ voices, selectedVoice, setSelectedVoice }) => {
  return (
    <div className="item w-100 my-3 m-md-0  overflow-hidden ">
      <select
        className=" overflow-hidden "
        value={selectedVoice ? selectedVoice.name : ""}
        onChange={(e) => {
          const selected = voices.find(
            (voice) => voice?.name === e.target.value
          );
          setSelectedVoice(selected);
        }}
      >
        {voices.map((voice) => (
          <option key={voice?.name} value={voice?.name}>
            {voice?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelector;
