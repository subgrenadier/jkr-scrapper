   _id: mongoose.Types.ObjectId,
   [x] title: String,
   [x] sitevisit: String,
   [x] dateposted: String,
   [] tenderoffice: String,
   [] tenderinfo: {
        [] price: Number,
        [] startsell: Date,
        [] stopsell: Date,
        [] paymentto: String,
        [] sellingplace: String,
        [] closingdate: Date,
        [] closingtime: String,
        [] submissionplace: String,
    },
   [] contractor: {
        [] class: String,
        [] category: String,
        [] companytype: String,
        [] taraf: String,
        [] otherregistration: String,
        [] consultation: String,
    },
   [] sitevisitremainder: String,
   [x] tenderurl: String,