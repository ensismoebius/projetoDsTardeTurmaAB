import logging

log_filename = 'EventosBack.log'  
log_format = '%(asctime)s - %(levelname)s - %(message)s'  
date_format = '%m/%d/%Y %I:%M:%S %p' 

logging.basicConfig(
    format=log_format,
    filename=log_filename,  
    datefmt=date_format,
    level=logging.WARNING  
)


def log_info_event(event_message):
   
    logging.info(event_message) 

def log_warning_event(event_message):
    
    logging.warning(event_message)

def log_error_event(event_message):
  
    logging.error(event_message)  

def log_debug_event(event_message):
    
    logging.debug(event_message) 

