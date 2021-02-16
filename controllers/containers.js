const { PsrApiEnums, PsrApiTypes } = require("../api");

exports.create_container = async (req, res, next) => {
  let psrApi = req.api;
  const conMan = psrApi.containerManager;
  let ouId = req.body.ouId ? req.body.ouId : req.userId;
  let containerName = req.body.containerName;
  let formName = req.body.formName;

  const pwPolicy = {
    PasswordLenght: 23, // count of characters
    MinimumPasswordQuality: 100, // quality check result for password
    LowerCase: true, // using lower case characters in password
    UpperCase: true, // using upper case characters in password
    Numbers: true, // using numbers in password
    SpecialChars: true, // using special characters in password
    SpecialCharList: "!#+-_", // using all shown special characters in password
    RequiredCategories: 4, // how many password recipe ingredients have to be included => e.g. 1 = lower case or upper case or ...
  };

  let password = createPassword();
  let container = await createContainer(containerName, password);

  if (!container) {
    return res.status(404).json({ message: "This form does not exist" });
  }

  await conMan
    .addContainer(container, ouId)
    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ message: "Created the new container successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Container creation failed", error: err });
    });

  function createPassword() {
    let passMan = psrApi.passwordManager;
    var newPassword = passMan.generatePolicyPassword(pwPolicy);
    return newPassword;
  }

  async function getApiBaseContainer() {
    let baseContainers = await conMan.getContainerList(
      PsrApiEnums.PsrContainerType.Form
    );

    let apiPasswordBaseContainer = baseContainers.find(
      (c) => c.Name === formName
    );

    return apiPasswordBaseContainer;
  }

  async function createContainer(name, password) {
    let baseContainer = await getApiBaseContainer();

    if (!baseContainer) {
      return null;
    }

    const container = new PsrApiTypes.PsrContainer();
    container.BaseContainerId = baseContainer.Id;
    container.ContainerType = PsrApiEnums.PsrContainerType.Password;
    container.Items = [];
    container.TimeStampUtc = new Date().toUTCString();

    const textItem = new PsrApiTypes.PsrContainerItem();
    textItem.ContainerItemType =
      PsrApiEnums.PsrContainerItemType.ContainerItemText;
    textItem.Name = "Beschreibung";
    textItem.Value = name;
    textItem.TimeStampUtc = new Date().toUTCString();

    const passwordItem = new PsrApiTypes.PsrContainerItem();
    passwordItem.ContainerItemType =
      PsrApiEnums.PsrContainerItemType.ContainerItemPassword;
    passwordItem.Name = "Passwort";
    passwordItem.PlainTextValue = password;
    passwordItem.TimeStampUtc = new Date().toUTCString();

    container.Items.push(textItem);
    container.Items.push(passwordItem);

    return container;
  }
};

exports.get_containers = async (req, res, next) => {
  let psrApi = req.api;

  const conMan = psrApi.containerManager;

  let baseContainers = await conMan.getContainerList(
    PsrApiEnums.PsrContainerType.Password
  );

  console.log(baseContainers);
};

exports.get_container = async (req, res, next) => {
  let psrApi = req.api;
  let containerId = req.params.containerId;

  const conMan = psrApi.containerManager;

  let container = await conMan
    .getContainer(containerId)

    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Fetching container failed", error: err });
    });

  if (!container) {
    return res.status(404).json({ message: "Container not found" });
  }

  let passwordItem = container.Items.find(
    (i) =>
      i.ContainerItemType ===
      PsrApiEnums.PsrContainerItemType.ContainerItemPassword
  );

  let password = await conMan
    .decryptContainerItem(passwordItem, "Testing")
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Decryption failed", error: err });
    });

  return res.status(200).json({ password });
};

exports.filter_containers = async (req, res, next) => {
  let psrApi = req.api;
  const search = req.body.search;

  const conMan = psrApi.containerManager;

  const passwordListFilter = await conMan.getContainerListFilter(
    PsrApiEnums.PsrContainerType.Password,
    true
  );

  const contentFilter = passwordListFilter.FilterGroups.find(
    (fg) => "SearchList" in fg
  ).SearchList[0];

  if (contentFilter) {
    contentFilter.Search = search;
    contentFilter.FilterActive = true;
  }

  const passwords = await conMan
    .getContainerList(PsrApiEnums.PsrContainerType.Password, passwordListFilter)
    .catch((err) => console.log(err));

  console.log(passwords);

  return res.status(200).json({ passwords });
};

exports.remove_api_user_rights = async (req, res, next) => {
  let psrApi = req.api;
  let containerId = req.body.containerId;

  const rightMan = psrApi.rightManager;

  await rightMan
    .removeLegitimateDataRight(containerId, req.userId, 127)
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Operation failed", error: err });
    });
};
