import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../configuration";

const ViewContract = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    updateContractStatus("accepted");
  };

  const updateContractStatus = async (status: String) => {
    try {
      await axios.patch(`${config.serverUri}/doctors/contract`, {
        contractStatus: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getContractStatus = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/doctors/contract`);
      if (response.data === "accepted") setAccepted(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContractStatus();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md mt-10 ml-10">
      <h1 className="text-2xl font-bold mb-4">Doctor's Employment Contract</h1>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus est
        pellentesque elit ullamcorper dignissim cras tincidunt. Eget nunc
        lobortis mattis aliquam faucibus purus. Pretium vulputate sapien nec
        sagittis aliquam malesuada bibendum arcu vitae. Sed viverra tellus in
        hac habitasse platea dictumst vestibulum rhoncus. Feugiat nibh sed
        pulvinar proin gravida hendrerit lectus a. Facilisi morbi tempus iaculis
        urna id volutpat lacus laoreet. Placerat in egestas erat imperdiet.
        Scelerisque varius morbi enim nunc. Ut sem viverra aliquet eget.
        Senectus et netus et malesuada. Lorem ipsum dolor sit amet consectetur
        adipiscing. Integer feugiat scelerisque varius morbi enim nunc. Massa
        ultricies mi quis hendrerit dolor. Donec enim diam vulputate ut
        pharetra. Adipiscing enim eu turpis egestas pretium aenean pharetra.
        Nunc sed velit dignissim sodales ut. Aliquet eget sit amet tellus cras
        adipiscing enim eu turpis. Sem et tortor consequat id porta nibh
        venenatis cras. Id volutpat lacus laoreet non curabitur gravida arcu ac
        tortor. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit
        duis. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce
        ut. Habitant morbi tristique senectus et netus et malesuada fames ac.
        Amet porttitor eget dolor morbi non arcu risus quis varius. Aliquet enim
        tortor at auctor urna nunc id cursus. Elementum facilisis leo vel
        fringilla est ullamcorper. Fermentum iaculis eu non diam phasellus.
        Lorem ipsum dolor sit amet consectetur adipiscing. Mattis rhoncus urna
        neque viverra. Felis donec et odio pellentesque diam volutpat. Diam
        vulputate ut pharetra sit amet aliquam. Congue mauris rhoncus aenean vel
        elit scelerisque. Nulla facilisi nullam vehicula ipsum a arcu cursus
        vitae congue. Nibh cras pulvinar mattis nunc sed. Lobortis elementum
        nibh tellus molestie nunc. Urna porttitor rhoncus dolor purus non enim.
        Lacinia quis vel eros donec ac odio tempor. Vestibulum lorem sed risus
        ultricies tristique nulla aliquet. Tellus elementum sagittis vitae et
        leo duis ut diam quam. Iaculis eu non diam phasellus. Nunc eget lorem
        dolor sed viverra ipsum nunc. Tellus molestie nunc non blandit massa
        enim nec dui. Velit sed ullamcorper morbi tincidunt ornare massa eget.
        Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et.
        Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu.
        Viverra adipiscing at in tellus integer feugiat. Vitae proin sagittis
        nisl rhoncus mattis rhoncus urna. Sollicitudin aliquam ultrices sagittis
        orci a scelerisque. Ullamcorper velit sed ullamcorper morbi tincidunt
        ornare massa eget egestas. Mattis nunc sed blandit libero volutpat sed
        cras ornare. Placerat vestibulum lectus mauris ultrices eros. Pulvinar
        pellentesque habitant morbi tristique senectus et netus et malesuada.
        Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. A diam
        maecenas sed enim ut sem. Nulla porttitor massa id neque aliquam
        vestibulum morbi blandit. Eget nunc scelerisque viverra mauris in.
        Semper risus in hendrerit gravida rutrum quisque. Aenean vel elit
        scelerisque mauris. Nam at lectus urna duis. Augue mauris augue neque
        gravida in. Porta non pulvinar neque laoreet suspendisse interdum
        consectetur libero. Porta nibh venenatis cras sed felis eget velit
        aliquet sagittis. Lectus quam id leo in vitae turpis. Magna etiam tempor
        orci eu lobortis elementum nibh tellus. Dolor purus non enim praesent
        elementum facilisis.
      </p>
      <button
        onClick={handleAccept}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
          accepted ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={accepted}
      >
        {accepted ? "Contract Accepted" : "Accept Contract"}
      </button>
    </div>
  );
};

export default ViewContract;
