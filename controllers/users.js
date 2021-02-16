exports.get_users = async (req, res, next) => {
  let psrApi = req.api;
  const ouMan = psrApi.organisationUnitManager;
  let filter = ouMan.getOrganisationUnitListFilter();
  await ouMan
    .getOrganisationUnitUserList(filter)
    .then((userOuList) => {
      res.status(200).json(userOuList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.get_user = async (req, res, next) => {
  let userId = req.params.userId;
  let psrApi = req.api;
  const ouMan = psrApi.organisationUnitManager;

  await ouMan
    .getOrganisationUnitUser(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
