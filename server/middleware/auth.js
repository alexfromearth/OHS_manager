export function cookiesCleaner(req, res, next) {
  if (req.cookies.company_sid && !req.session.company) {
    res.clearCookie("company_sid");
  }
  next();
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const sessionChecker = (req, res, next) => {
  // if (!req.session.company) {
  //   return res.send(401).json({msg: "Unauthorized"});
  // } else {
    next();
  // }
};
