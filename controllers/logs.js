const { PsrApiEnums } = require("../api");

exports.lastShownPasswords = async (req, res, next) => {
  let psrApi = req.api;
  const logMan = psrApi.logbookManager;
  const ONE_DAY = 24 * 3600 * 1000;

  let userId = req.params.userId;
  let days = req.params.days * ONE_DAY;

  let filter = logMan.getLogbookListFilter();

  await logMan
    .getLogbookEntries(filter)
    .then((logs) => {
      let shownPasswords = logs.filter(
        (log) =>
          log.LogbookEvent == PsrApiEnums.PsrLogbookEvent.PsrLogbookEventShow &&
          log.OrganisationUnit.Id == userId &&
          new Date(log.TimeStampUtc) > Date.now() - days
      );
      res.status(200).json(shownPasswords);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
