
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
                    dataReser: rese
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
            conn.query("SELECT * FROM reservacion WHERE\
            hora_inicial BETWEEN ? AND\
            ? OR hora_final BETWEEN ? AND\
            ?", [req.body.hora_inicial, req.body.hora_final, req.body.hora_inicial, req.body.hora_final], (err, rows) => {
                if (err) {
                    res.json(err);
                    return;
                }
                if(rows.length==0){
                    conn.query("INSERT INTO `reservacion` (`ID_sala`, `hora_inicial`, `hora_final`)\
                VALUES (?,?,?) ", [req.body.IDSala,req.body.hora_inicial+':00',req.body.hora_final+':00'], (err, rows) => {
                    console.log(err);
                    res.redirect('/');
                    
                });
                }
                else{
                    console.log(rows);
                    console.log("Ingrese un horario que no este ocupado");
                    res.redirect('/');
                }
              
                
            });


        })

    } else {
     console.log("Ingrese un lapso entre dos horas");
    }
};

controller.saveSala = (req, res) => {
    req.getConnection((err, conn) => {

        conn.query("INSERT INTO `sala` (`nombre_sala`) VALUES (?) ", [req.body.nombre_sala], (err, rows) => {
            console.log(err);
            res.redirect('/');
        });
    })

};


controller.delete = (req,res)=>{
    const { id } = req.params;
    req.getConnection((err,conn)=>{
        console.log()
        conn.query("DELETE FROM reservacion WHERE ID =?", [id], (err,rows)=>{
            res.redirect('/');
            
        });
        
    })
};


module.exports = controller;