
const controller = {};

controller.listReser = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reservacion', (err, rese) => {
            if (err) {
                res.json(err);
                return;
            }
            conn.query('SELECT * FROM sala', (err, salas) => {
                if (err) {
                    res.json(err);
                    return;
                }
                res.render('salas', {
                    dataSala: salas,
                    dataReser:rese
                });
            });
         
        });
        

    });
};


controller.saveReser = (req, res) => {
    var hora_ini = new Date(req.body.hora_inicial);
    var hora_fin = new Date(req.body.hora_final);

    const diffTime = Math.abs(hora_fin - hora_ini);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffHours <= 2) {
        req.getConnection((err, conn) => {

            conn.query("INSERT INTO  reservacion(`ID_sala`, `hora_inicial`, `hora_final`) VALUES (???) ", [req.data], (err, rows) => {

                res.redirect('/')
            });
        })
    } else {
        res.json("error ;v");
    }
};

controller.saveSala = (req, res) => {
    

   
        req.getConnection((err, conn) => {

            conn.query("INSERT INTO sala (`nombre_sala`) VALUES (?) ", [req.body.nombre_sala], (err, rows) => {
                console.log(err);
                res.redirect('/')
            });
        })

};



module.exports = controller;