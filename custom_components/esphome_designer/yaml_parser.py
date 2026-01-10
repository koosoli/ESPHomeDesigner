"""
Facade for the modularized YAML parser.
Maintains backward compatibility for imports from .yaml_parser.
"""
from .yaml_parser.core import yaml_to_layout

__all__ = ["yaml_to_layout"]