import React from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'
/* eslint no-constant-condition: 0 */

const extrafooter = (
  <div className={styles.inner}>
    <div className="row">
      <div className="col-lg-12">
        <p>
          <strong>MOTOR DOC</strong>
        </p>
        <p>
          El gran aumento de la adquisición de motos en colombia y su circulación exponencial en la ciudad 
          de Bogotá demanda una mayor eficiencia de los talleres, ya que se están viendo afectados los tiempos 
          de respuesta al servicio y atención de los empleados que brindan estas compañías. Cuyos usuarios 
          llegan a los establecimientos por algún tipo de mantenimiento o garantía, la cual brinda una calidad 
          de servicio muy baja, teniendo como consecuencia la insatisfacción y tiempo perdido de sus clientes... 
          Es por esto que resulta relevante visualizar y analizar una temática que abra camino a otras modalidades de atención al usuario.
        </p>
      </div>
    </div>
    <div className={styles.bottom}>
      <div className="row">
        <div className="col-sm-6">
          <a
            href="https://motor-doc-lp.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <Button type="danger" icon="plus">Visita nuestra pagina</Button>
          </a>
        </div>
        <div className="col-sm-6">
          <div className={styles.copyright} align="right">
            <span>
              © 2020{' '}
              <a href="http://mediatec.org/" target="_blank" rel="noopener noreferrer">
                Fundación Universaria Uninpahu
              </a>
              <br />
              Ingenieria de Software
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Footer = () => <div className={styles.footer}>{extrafooter}</div>

export default Footer
