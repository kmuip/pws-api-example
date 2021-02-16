exports.get_ous = async (req, res, next) => {
  let psrApi = req.api;
  const ouMan = psrApi.organisationUnitManager;
  let filter = ouMan.getOrganisationUnitListFilter();
  await ouMan
    .getOrganisationUnitStructure(filter)
    .then((ouList) => {
      res.status(200).json(ouList.map((ou) => ou.OrganisationUnit));
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
