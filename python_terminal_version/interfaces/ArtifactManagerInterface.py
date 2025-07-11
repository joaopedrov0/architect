from abc import ABC, abstractmethod

class AbstractManagerInterface(ABC):
    
    @abstractmethod
    def lifeCycle(self):
        """
        Objetivo: Gerenciar o ciclo de vida de gerenciamento do artefato.
        """
        pass
    
    @abstractmethod
    def create(self):
        """
        Objetivo: Criar e armazenar um artefato.
        """
        pass

    @abstractmethod
    def read(self):
        """
        Objetivo: Exibir todos os artefatos armazenados.
        """
        pass

    @abstractmethod
    def edit(self):
        """
        Objetivo: Editar um artefato existente.
        """
        pass

    @abstractmethod
    def delete(self):
        """
        Objetivo: Deletar um artefato existente.
        """
        pass